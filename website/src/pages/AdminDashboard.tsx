// pages/AdminDashboard.tsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import JsBarcode from 'jsbarcode';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'paid' | 'pending' | 'failed' | string;
  deliveryStatus?: 'ordered' | 'dispatched' | 'shipped' | 'delivered';
  isChecked?: boolean;
  notes?: string;
  couponCode?: string;
  createdAt: string;
  razorpayOrderId?: string;
  paymentId?: string;
  razorpaySignature?: string;
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('');
  const [couponFilter, setCouponFilter] = useState('');
  const [checkedFilter, setCheckedFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('date-desc');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Order | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ id: string; text: string } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin-login');
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
        return;
      }

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  const patchOrder = async (id: string, payload: Record<string, any>) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const res = await fetch(`${API_BASE_URL}/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(await res.text());
      throw new Error('PATCH failed');
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await patchOrder(id, { status: newStatus });
      await fetchOrders();
      setMenuOpen(null);
    } catch {
      alert('Failed to update payment status');
    }
  };

  const updateDeliveryStatus = async (id: string, newDeliveryStatus: string) => {
    try {
      await patchOrder(id, { deliveryStatus: newDeliveryStatus });
      await fetchOrders();
      setMenuOpen(null);
    } catch {
      alert('Failed to update delivery status');
    }
  };

  const toggleChecked = async (id: string, currentValue: boolean) => {
    try {
      await patchOrder(id, { isChecked: !currentValue });
      await fetchOrders();
    } catch {
      alert('Failed to update order status');
    }
  };

  const saveNotes = async (id: string, notes: string) => {
    try {
      await patchOrder(id, { notes });
      await fetchOrders();
      setEditingNotes(null);
    } catch {
      alert('Failed to save notes');
    }
  };

  const deleteOrder = async () => {
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${confirmDelete._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error(await res.text());
        throw new Error('Delete failed');
      }

      setConfirmDelete(null);
      await fetchOrders();
    } catch {
      alert('Failed to delete order');
    }
  };

  // Shipping label: half A4, no weight/dimensions/courier
  const generateShippingLabel = (order: Order) => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    const marginX = 10;
    let y = 15;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('EKA GIFTS', 105, y, { align: 'center' });
    y += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('www.ekagifts.com', 105, y, { align: 'center' });
    y += 10;

    // barcode
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, order.orderId, {
      format: 'CODE128',
      width: 1.6,
      height: 25,
      displayValue: true,
      fontSize: 10,
    });
    const barcodeImg = canvas.toDataURL('image/png');
    doc.addImage(barcodeImg, 'PNG', marginX + 20, y, 110, 25);
    y += 35;

    // FROM
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('FROM:', marginX, y);
    y += 5;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('EKA Gifts', marginX, y);
    y += 5;
    doc.text('[Your Address Line 1]', marginX, y);
    y += 5;
    doc.text('[Your Address Line 2]', marginX, y);
    y += 5;
    doc.text('[City, State, PIN]', marginX, y);
    y += 10;

    // TO
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SHIP TO:', marginX, y);
    y += 7;

    doc.setFontSize(11);
    doc.text(order.customerName.toUpperCase(), marginX, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const addrLines = doc.splitTextToSize(order.address, 180 - marginX * 2);
    addrLines.forEach((line: string) => {
      doc.text(line, marginX, y);
      y += 5;
    });

    y += 2;
    doc.text(`Phone: ${order.phone}`, marginX, y);
    y += 5;
    doc.text(`Email: ${order.email}`, marginX, y);
    y += 8;

    // order details box - stays in upper half
    const boxTop = y;
    const boxHeight = 30;

    doc.setDrawColor(180);
    doc.setLineWidth(0.3);
    doc.rect(marginX, boxTop, 190 - marginX * 2, boxHeight);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`Order ID: ${order.orderId}`, marginX + 4, boxTop + 7);
    doc.text(
      `Order Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`,
      marginX + 4,
      boxTop + 13
    );
    doc.text(`Payment: ${order.status.toUpperCase()}`, marginX + 4, boxTop + 19);
    doc.text(
      `Total: ₹${order.totalAmount.toLocaleString('en-IN')}`,
      marginX + 4,
      boxTop + 25
    );
    doc.text(`Items: ${order.items.length}`, marginX + 70, boxTop + 7);

    // footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Handle with care', 105, boxTop + boxHeight + 10, {
      align: 'center',
    });

    // only upper half used – rest blank
    doc.save(`ShippingLabel_${order.orderId}.pdf`);
  };

  // FILTER + SORT
  const filteredOrders = useMemo(() => {
    let list = orders.filter((o) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        o.orderId.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.address.toLowerCase().includes(q) ||
        (o.razorpayOrderId || '').toLowerCase().includes(q) ||
        (o.paymentId || '').toLowerCase().includes(q) ||
        (o.couponCode || '').toLowerCase().includes(q) ||
        (o.notes || '').toLowerCase().includes(q);

      const matchesStatus = !statusFilter || o.status === statusFilter;
      const matchesDelivery = !deliveryFilter || o.deliveryStatus === deliveryFilter;
      const matchesCoupon =
        !couponFilter ||
        (couponFilter === 'with-coupon' ? !!o.couponCode : !o.couponCode);
      const matchesChecked =
        !checkedFilter ||
        (checkedFilter === 'checked' ? !!o.isChecked : !o.isChecked);

      const d = new Date(o.createdAt);
      const matchesDate =
        (!dateRange.start || d >= new Date(dateRange.start)) &&
        (!dateRange.end || d <= new Date(dateRange.end));

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDelivery &&
        matchesCoupon &&
        matchesChecked &&
        matchesDate
      );
    });

    list.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'amount-asc':
          return a.totalAmount - b.totalAmount;
        case 'amount-desc':
          return b.totalAmount - a.totalAmount;
        case 'name-asc':
          return a.customerName.localeCompare(b.customerName);
        case 'name-desc':
          return b.customerName.localeCompare(a.customerName);
        default:
          return 0;
      }
    });

    return list;
  }, [orders, search, statusFilter, deliveryFilter, couponFilter, checkedFilter, dateRange, sortBy]);

  // STATS
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders
    .filter((o) => o.status === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const uniqueCustomers = new Set(
    filteredOrders.map((o) => o.email || o.phone || o.customerName)
  ).size;
  const paidCount = filteredOrders.filter((o) => o.status === 'paid').length;

  // EXPORTS
  const exportToExcel = () => {
    const data = filteredOrders.map((o) => ({
      'EKA ID': o.orderId,
      Customer: o.customerName,
      Email: o.email,
      Phone: o.phone,
      Address: o.address,
      'Total Amount': o.totalAmount,
      'Payment Status': o.status,
      'Delivery Status': o.deliveryStatus || '-',
      Checked: o.isChecked ? 'Yes' : 'No',
      Notes: o.notes || '-',
      'Coupon Code': o.couponCode || '-',
      'Razorpay Order ID': o.razorpayOrderId || '-',
      'Payment ID': o.paymentId || '-',
      Date: new Date(o.createdAt).toLocaleDateString('en-IN'),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, `EKA_Orders_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('EKA Orders Report', 14, 18);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, 25);

    const body = filteredOrders.map((o) => [
      o.orderId,
      o.customerName,
      `₹${o.totalAmount}`,
      o.status,
      o.deliveryStatus || '-',
      o.isChecked ? 'Yes' : 'No',
      new Date(o.createdAt).toLocaleDateString('en-IN'),
    ]);

    autoTable(doc, {
      startY: 32,
      head: [['EKA ID', 'Customer', 'Amount', 'Payment', 'Delivery', 'Checked', 'Date']],
      body,
      styles: { fontSize: 8 },
    });

    doc.save(`EKA_Orders_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setDeliveryFilter('');
    setCouponFilter('');
    setCheckedFilter('');
    setDateRange({ start: '', end: '' });
    setSortBy('date-desc');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="px-6 py-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-600">
          Loading orders…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">EKA · Orders Admin</h1>
            <p className="text-xs text-slate-500">
              Orders, payments, and fulfilment overview
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/admin-login');
            }}
            className="px-4 py-2 rounded-md text-xs font-medium border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* Metrics */}
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white border border-slate-200 p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              Total orders
            </p>
            <p className="mt-1 text-2xl font-semibold">{totalOrders}</p>
          </div>
          <div className="rounded-xl bg-white border border-slate-200 p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              Paid revenue
            </p>
            <p className="mt-1 text-2xl font-semibold">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="rounded-xl bg-white border border-slate-200 p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              Customers
            </p>
            <p className="mt-1 text-2xl font-semibold">{uniqueCustomers}</p>
          </div>
          <div className="rounded-xl bg-white border border-slate-200 p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              Paid orders
            </p>
            <p className="mt-1 text-2xl font-semibold">{paidCount}</p>
          </div>
        </section>

        {/* Filters */}
        <section className="space-y-4">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search EKA ID, name, email, phone, address, notes, coupon…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
            <button
              onClick={fetchOrders}
              className="px-4 py-2 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
            >
              Refresh
            </button>
          </div>

          {/* Filters row */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="">Payment status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="">Delivery status</option>
              <option value="ordered">Ordered</option>
              <option value="dispatched">Dispatched</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            <select
              value={checkedFilter}
              onChange={(e) => setCheckedFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="">Order status</option>
              <option value="checked">Checked</option>
              <option value="unchecked">Unchecked</option>
            </select>

            <select
              value={couponFilter}
              onChange={(e) => setCouponFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="">Coupon usage</option>
              <option value="with-coupon">With coupon</option>
              <option value="no-coupon">No coupon</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="date-desc">Date · Newest</option>
              <option value="date-asc">Date · Oldest</option>
              <option value="amount-desc">Amount · High → Low</option>
              <option value="amount-asc">Amount · Low → High</option>
              <option value="name-asc">Name · A → Z</option>
              <option value="name-desc">Name · Z → A</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-3 py-2 text-xs rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            >
              Clear filters
            </button>
          </div>

          {/* Date range + export */}
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">Date range</span>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((d) => ({ ...d, start: e.target.value }))
                }
                className="px-3 py-2 text-xs rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
              <span className="text-xs text-slate-500">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((d) => ({ ...d, end: e.target.value }))
                }
                className="px-3 py-2 text-xs rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>

            <div className="flex gap-2 md:ml-auto">
              <button
                onClick={exportToExcel}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-500"
              >
                Export Excel
              </button>
              <button
                onClick={exportToPDF}
                className="px-4 py-2 rounded-md bg-slate-700 text-white text-xs font-medium hover:bg-slate-600"
              >
                Export PDF
              </button>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-xs text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3 text-center">✓</th>
                  <th className="px-4 py-3 text-left">EKA ID</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-left">Delivery</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOrders.map((o) => {
                  const paymentClass =
                    o.status === 'paid'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : o.status === 'pending'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200';

                  const dStatus = o.deliveryStatus || 'ordered';
                  const deliveryClass =
                    dStatus === 'delivered'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : dStatus === 'shipped'
                      ? 'bg-sky-50 text-sky-700 border-sky-200'
                      : dStatus === 'dispatched'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200';

                  return (
                    <tr key={o._id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={!!o.isChecked}
                          onChange={() => toggleChecked(o._id, !!o.isChecked)}
                          className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="font-mono text-xs font-semibold text-slate-900">
                          {o.orderId}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {o.razorpayOrderId || '-'}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="text-sm font-medium text-slate-900">
                          {o.customerName}
                        </div>
                        <div className="text-[11px] text-slate-500">{o.email}</div>
                        <div className="text-[11px] text-slate-500">{o.phone}</div>
                      </td>
                      <td className="px-4 py-3 align-top max-w-xs">
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {o.address}
                        </p>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="text-sm font-semibold text-slate-900">
                          ₹{o.totalAmount.toLocaleString('en-IN')}
                        </div>
                        {o.couponCode && (
                          <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                            {o.couponCode}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${paymentClass}`}
                        >
                          {o.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${deliveryClass}`}
                        >
                          {dStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top max-w-xs">
                        {editingNotes && editingNotes.id === o._id ? (
                          <div className="flex gap-1">
                            <input
                              type="text"
                              value={editingNotes.text}
                              onChange={(e) =>
                                setEditingNotes({ id: o._id, text: e.target.value })
                              }
                              className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-slate-400"
                              autoFocus
                            />
                            <button
                              onClick={() => saveNotes(o._id, editingNotes.text)}
                              className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingNotes(null)}
                              className="px-2 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              setEditingNotes({ id: o._id, text: o.notes || '' })
                            }
                            className="text-xs text-slate-600 cursor-pointer hover:bg-slate-100 p-1 rounded line-clamp-2"
                          >
                            {o.notes && o.notes.trim().length > 0
                              ? o.notes
                              : 'Click to add notes...'}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-[11px] text-slate-500">
                        {new Date(o.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3 align-top relative">
                        <button
                          onClick={() =>
                            setMenuOpen((prev) => (prev === o._id ? null : o._id))
                          }
                          className="p-2 rounded-md hover:bg-slate-100"
                        >
                          <svg
                            className="w-4 h-4 text-slate-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 11.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                          </svg>
                        </button>

                        {menuOpen === o._id && (
                          <div className="absolute right-0 mt-2 w-56 rounded-md border border-slate-200 bg-white shadow-lg z-50">
                            <button
                              onClick={() => setSelectedOrder(o)}
                              className="w-full px-4 py-2 text-left text-xs text-slate-800 hover:bg-slate-50"
                            >
                              View details
                            </button>
                            <button
                              onClick={() => {
                                generateShippingLabel(o);
                                setMenuOpen(null);
                              }}
                              className="w-full px-4 py-2 text-left text-xs text-blue-700 hover:bg-blue-50 border-t border-slate-200"
                            >
                              📦 Generate shipping label
                            </button>
                            <div className="border-t border-slate-200">
                              <p className="px-4 pt-2 text-[10px] font-semibold text-slate-500 uppercase">
                                Payment
                              </p>
                              {['paid', 'pending', 'failed'].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => updateStatus(o._id, status)}
                                  className="w-full px-4 py-1.5 text-left text-xs text-slate-800 hover:bg-slate-50"
                                >
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                              ))}
                            </div>
                            <div className="border-t border-slate-200">
                              <p className="px-4 pt-2 text-[10px] font-semibold text-slate-500 uppercase">
                                Delivery
                              </p>
                              {['ordered', 'dispatched', 'shipped', 'delivered'].map(
                                (status) => (
                                  <button
                                    key={status}
                                    onClick={() => updateDeliveryStatus(o._id, status)}
                                    className="w-full px-4 py-1.5 text-left text-xs text-slate-800 hover:bg-slate-50"
                                  >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </button>
                                )
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setConfirmDelete(o);
                                setMenuOpen(null);
                              }}
                              className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 border-t border-slate-200"
                            >
                              Delete order
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="py-10 text-center text-sm text-slate-500">
              No orders match the current filters.
            </div>
          )}
        </section>
      </main>

      {/* View modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="max-w-2xl w-full bg-white rounded-xl border border-slate-200 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Order {selectedOrder.orderId}
                </h2>
                <p className="text-[11px] text-slate-500">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-md hover:bg-slate-100"
              >
                <svg
                  className="w-4 h-4 text-slate-700"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-6 text-xs text-slate-900">
              {/* Timeline */}
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-500 mb-3">
                  Delivery timeline
                </p>
                <div className="space-y-3">
                  {['ordered', 'dispatched', 'shipped', 'delivered'].map(
                    (status, idx) => {
                      const current = selectedOrder.deliveryStatus || 'ordered';
                      const orderSteps = ['ordered', 'dispatched', 'shipped', 'delivered'];
                      const currentIndex = orderSteps.indexOf(current);
                      const isPassed = currentIndex >= idx;
                      const isActive = currentIndex === idx;

                      return (
                        <div key={status} className="flex items-start gap-3">
                          <div className="flex flex-col items-center mt-0.5">
                            <div
                              className={`h-3 w-3 rounded-full border ${
                                isPassed
                                  ? 'bg-emerald-500 border-emerald-500'
                                  : 'bg-white border-slate-300'
                              }`}
                            />
                            {idx < orderSteps.length - 1 && (
                              <div
                                className={`w-px h-8 mt-1 ${
                                  isPassed ? 'bg-emerald-400' : 'bg-slate-300'
                                }`}
                              />
                            )}
                          </div>
                          <div className="pb-4">
                            <p
                              className={`text-xs font-medium ${
                                isActive
                                  ? 'text-emerald-700'
                                  : isPassed
                                  ? 'text-slate-900'
                                  : 'text-slate-400'
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </p>
                            {isActive && (
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Current status
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Customer
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-medium text-slate-900">
                      {selectedOrder.customerName}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      {selectedOrder.email}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      {selectedOrder.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Shipping address
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] text-slate-800 whitespace-pre-wrap">
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Payment
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-600">Status</span>
                      <span className="text-slate-900 font-medium">
                        {selectedOrder.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-600">Total</span>
                      <span className="text-slate-900 font-semibold">
                        ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {selectedOrder.couponCode && (
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-600">Coupon</span>
                        <span className="text-slate-900 font-medium">
                          {selectedOrder.couponCode}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">Razorpay Order</span>
                      <span className="text-slate-800 font-mono">
                        {selectedOrder.razorpayOrderId || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">Payment ID</span>
                      <span className="text-slate-800 font-mono">
                        {selectedOrder.paymentId || '-'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Items
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2 max-h-60 overflow-y-auto">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <div className="flex-1">
                          <p className="text-slate-900 font-medium">{item.name}</p>
                          <p className="text-slate-600">
                            Qty {item.quantity} · ₹
                            {item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <p className="text-slate-900 font-semibold">
                          ₹
                          {(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedOrder.notes && selectedOrder.notes.trim().length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Admin notes
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-amber-50 p-3">
                    <p className="text-xs text-slate-800">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => generateShippingLabel(selectedOrder)}
                className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500"
              >
                📦 Generate shipping label
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="max-w-sm w-full bg-white rounded-xl border border-slate-200 shadow-lg">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="text-sm font-semibold text-slate-900">
                Delete order?
              </h2>
            </div>
            <div className="px-5 py-4 text-xs text-slate-700 space-y-3">
              <p>
                This will permanently remove order{' '}
                <span className="font-mono text-slate-900">
                  {confirmDelete.orderId}
                </span>
                .
              </p>
              <p className="text-slate-500">This action cannot be undone.</p>
            </div>
            <div className="px-5 py-4 flex justify-end gap-2 border-t border-slate-200">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-md text-xs border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteOrder}
                className="px-4 py-2 rounded-md text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* click outside actions menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

