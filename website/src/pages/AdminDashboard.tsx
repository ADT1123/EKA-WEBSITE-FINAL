// pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';

interface OrderItem {
  id?: string;
  name?: string;
  price?: number;
  quantity?: number;
  image?: string;
}

interface Order {
  _id: string;
  id?: string;                          // optional, Atlas me ho bhi sakta hai nahi bhi
  userId?: string;
  userEmail?: string;
  userName?: string;
  items?: OrderItem[];
  total?: number;
  amount?: number;                      // fallback, agar schema me amount ho
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'paid';
  paymentStatus?: string;              // e.g. "paid" / "pending"
  address?: {
    name?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
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

      const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
        return;
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin-login');
        return;
      }

      await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      const safeId = (order.id || order._id || '').toString();
      const safeName =
        (order.userName ||
          order.address?.name ||
          '').toLowerCase();
      const safeEmail = (order.userEmail || '').toLowerCase();
      const q = search.toLowerCase();

      return (
        safeId.includes(q) ||
        safeName.includes(q) ||
        safeEmail.includes(q)
      );
    })
    .filter((order) => !statusFilter || order.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdf9ff] to-white flex items-center justify-center">
        <div className="text-lg text-slate-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf9ff] to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-black text-[#4b2c5e]">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/admin-login');
            }}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by ID, name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#ffd27a] focus:ring-1 focus:ring-[#ffd27a]/20 outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#ffd27a] focus:ring-1 focus:ring-[#ffd27a]/20 outline-none"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="paid">Paid</option>
          </select>
          <button
            onClick={fetchOrders}
            className="px-8 py-3 bg-gradient-to-r from-[#4b2c5e] to-[#6b4e7d] text-white rounded-2xl font-semibold hover:brightness-105 transition-all"
          >
            Refresh
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#fdf9ff] to-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOrders.map((order) => {
                  const displayId = order.id || order._id;
                  const customerName =
                    order.userName ||
                    order.address?.name ||
                    'Unknown';
                  const customerEmail = order.userEmail || '-';
                  const totalValue =
                    order.total ??
                    order.amount ??
                    0;
                  const created =
                    order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('en-IN')
                      : '-';

                  const statusLabel = (order.status || 'pending').toUpperCase();
                  const paymentLabel =
                    order.paymentStatus === 'paid' ||
                    order.status === 'paid' ||
                    order.status === 'delivered'
                      ? 'PAID'
                      : 'PENDING';

                  const statusClass =
                    order.status === 'delivered' || order.status === 'paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'confirmed'
                      ? 'bg-amber-100 text-amber-800'
                      : order.status === 'pending'
                      ? 'bg-slate-100 text-slate-800'
                      : 'bg-rose-100 text-rose-800';

                  const paymentClass =
                    paymentLabel === 'PAID'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-slate-100 text-slate-700';

                  return (
                    <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                      {/* Order ID */}
                      <td className="px-6 py-4 font-mono text-sm font-semibold text-[#4b2c5e]">
                        #{displayId}
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">
                          {customerName}
                        </div>
                        <div className="text-sm text-slate-500">
                          {customerEmail}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-[#4b2c5e]">
                          ₹{totalValue.toLocaleString('en-IN')}
                        </span>
                      </td>

                      {/* Status + Payment */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}
                          >
                            {statusLabel}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-semibold self-start ${paymentClass}`}
                          >
                            {paymentLabel}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {created}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(
                                order._id,
                                e.target.value as Order['status']
                              )
                            }
                            className="px-3 py-1 rounded-xl text-xs border border-slate-200 focus:border-[#ffd27a] focus:ring-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            No orders found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
