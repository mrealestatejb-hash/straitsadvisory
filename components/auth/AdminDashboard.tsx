'use client';

import { useState, useEffect, useCallback } from 'react';
import { signOut } from 'next-auth/react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  approved: boolean;
  createdAt: string;
}

interface Property {
  id: string;
  name: string;
  slug: string;
  developer: string;
  location: string;
  area: string;
  type: string;
  status: string;
  tenure: string;
  priceRM: number;
  priceMaxRM: number | null;
  beds: string;
  baths: string;
  size: string;
  yieldPercent: number | null;
  rtsDistance: string | null;
  description: string | null;
  amenities: string[] | null;
  features: string[] | null;
  tourUrl: string | null;
  whatsappUrl: string | null;
  gradient: string | null;
  lat: number | null;
  lng: number | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

type Tab = 'users' | 'properties';

const EMPTY_FORM: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'> = {
  name: '',
  developer: '',
  location: '',
  area: '',
  type: 'condo',
  status: 'completed',
  tenure: 'freehold',
  priceRM: 0,
  priceMaxRM: null,
  beds: '',
  baths: '',
  size: '',
  yieldPercent: null,
  rtsDistance: null,
  description: null,
  amenities: null,
  features: null,
  tourUrl: null,
  whatsappUrl: null,
  gradient: null,
  lat: null,
  lng: null,
  published: true,
};

// ─── Component ──────────────────────────────────────────────────────────────

export function AdminDashboard({ currentUserId }: { currentUserId: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('users');

  // User state
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  // Property state
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [amenitiesInput, setAmenitiesInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // ─── Toast ────────────────────────────────────────────────────────────────

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ─── Users ────────────────────────────────────────────────────────────────

  const fetchUsers = useCallback(async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users);
    setUsersLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUser = async (
    userId: string,
    updates: { role?: string; approved?: boolean }
  ) => {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...updates }),
    });
    fetchUsers();
  };

  // ─── Properties ───────────────────────────────────────────────────────────

  const fetchProperties = useCallback(async () => {
    setPropertiesLoading(true);
    try {
      const res = await fetch('/api/admin/properties');
      const data = await res.json();
      setProperties(data.properties);
    } catch {
      showToast('Failed to load properties', 'error');
    }
    setPropertiesLoading(false);
  }, [showToast]);

  useEffect(() => {
    if (activeTab === 'properties' && properties.length === 0) {
      fetchProperties();
    }
  }, [activeTab, properties.length, fetchProperties]);

  const openAddForm = () => {
    setEditingProperty(null);
    setForm(EMPTY_FORM);
    setAmenitiesInput('');
    setShowForm(true);
  };

  const openEditForm = (property: Property) => {
    setEditingProperty(property);
    setForm({
      name: property.name,
      developer: property.developer,
      location: property.location,
      area: property.area,
      type: property.type,
      status: property.status,
      tenure: property.tenure,
      priceRM: property.priceRM,
      priceMaxRM: property.priceMaxRM,
      beds: property.beds,
      baths: property.baths,
      size: property.size,
      yieldPercent: property.yieldPercent,
      rtsDistance: property.rtsDistance,
      description: property.description,
      amenities: property.amenities,
      features: property.features,
      tourUrl: property.tourUrl,
      whatsappUrl: property.whatsappUrl,
      gradient: property.gradient,
      lat: property.lat,
      lng: property.lng,
      published: property.published,
    });
    setAmenitiesInput(
      Array.isArray(property.amenities) ? property.amenities.join(', ') : ''
    );
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleSave = async () => {
    if (!form.name || !form.developer || !form.location || !form.area) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        amenities: amenitiesInput
          ? amenitiesInput.split(',').map((s) => s.trim()).filter(Boolean)
          : null,
      };

      if (editingProperty) {
        const res = await fetch(`/api/admin/properties/${editingProperty.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Update failed');
        showToast('Property updated', 'success');
      } else {
        const res = await fetch('/api/admin/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Create failed');
        showToast('Property created', 'success');
      }

      closeForm();
      fetchProperties();
    } catch {
      showToast('Failed to save property', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      showToast('Property deleted', 'success');
      setDeleteConfirmId(null);
      fetchProperties();
    } catch {
      showToast('Failed to delete property', 'error');
    }
  };

  const togglePublished = async (property: Property) => {
    try {
      await fetch(`/api/admin/properties/${property.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !property.published }),
      });
      fetchProperties();
    } catch {
      showToast('Failed to update property', 'error');
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
          <p className="text-xs text-slate-400">Straits Advisory</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10 px-6">
        <div className="flex gap-1">
          {(['users', 'properties'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors capitalize cursor-pointer ${
                activeTab === tab
                  ? 'text-white border-b-2 border-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="p-6 max-w-6xl mx-auto">
        {activeTab === 'users' && <UsersTab users={users} loading={usersLoading} currentUserId={currentUserId} updateUser={updateUser} />}
        {activeTab === 'properties' && (
          <PropertiesTab
            properties={properties}
            loading={propertiesLoading}
            onAdd={openAddForm}
            onEdit={openEditForm}
            onDelete={(id) => setDeleteConfirmId(id)}
            onTogglePublished={togglePublished}
          />
        )}
      </main>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyFormModal
          form={form}
          setForm={setForm}
          amenitiesInput={amenitiesInput}
          setAmenitiesInput={setAmenitiesInput}
          isEditing={!!editingProperty}
          saving={saving}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-white font-semibold text-lg mb-2">Delete Property</h3>
            <p className="text-slate-400 text-sm mb-6">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Users Tab ──────────────────────────────────────────────────────────────

function UsersTab({
  users,
  loading,
  currentUserId,
  updateUser,
}: {
  users: User[];
  loading: boolean;
  currentUserId: string;
  updateUser: (userId: string, updates: { role?: string; approved?: boolean }) => void;
}) {
  if (loading) {
    return <div className="text-center text-slate-400 py-12">Loading users...</div>;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th className="px-4 py-3 text-slate-400 font-medium">User</th>
            <th className="px-4 py-3 text-slate-400 font-medium">Role</th>
            <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
            <th className="px-4 py-3 text-slate-400 font-medium">Joined</th>
            <th className="px-4 py-3 text-slate-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {user.image ? (
                    <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                      {user.name?.[0] || '?'}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                {user.id === currentUserId ? (
                  <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full">
                    ADMIN
                  </span>
                ) : (
                  <select
                    value={user.role}
                    onChange={(e) => updateUser(user.id, { role: e.target.value })}
                    className="bg-white/10 border border-white/10 text-white text-xs rounded-lg px-2 py-1 cursor-pointer"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CLIENT">CLIENT</option>
                    <option value="AGENT">AGENT</option>
                  </select>
                )}
              </td>
              <td className="px-4 py-3">
                {user.id === currentUserId || user.approved ? (
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                    Approved
                  </span>
                ) : (
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                    Pending
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-slate-400 text-xs">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                {user.id !== currentUserId && (
                  <div className="flex gap-2">
                    {!user.approved ? (
                      <button
                        onClick={() => updateUser(user.id, { approved: true })}
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUser(user.id, { approved: false, role: 'PENDING' })}
                        className="text-xs bg-red-600/80 hover:bg-red-500 text-white px-3 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Properties Tab ─────────────────────────────────────────────────────────

function PropertiesTab({
  properties,
  loading,
  onAdd,
  onEdit,
  onDelete,
  onTogglePublished,
}: {
  properties: Property[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (property: Property) => void;
}) {
  if (loading) {
    return <div className="text-center text-slate-400 py-12">Loading properties...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'}
        </p>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Property
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-4 py-3 text-slate-400 font-medium">Name</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Location</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Tenure</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Price (RM)</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Published</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No properties yet. Click &quot;Add Property&quot; to create one.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium">{property.name}</p>
                        <p className="text-xs text-slate-500">{property.developer}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{property.location}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          property.status === 'new-launch'
                            ? 'bg-blue-500/20 text-blue-300'
                            : property.status === 'construction'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 capitalize">{property.tenure}</td>
                    <td className="px-4 py-3 text-slate-300">
                      {property.priceRM.toLocaleString()}
                      {property.priceMaxRM && ` - ${property.priceMaxRM.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onTogglePublished(property)}
                        className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative ${
                          property.published ? 'bg-emerald-600' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            property.published ? 'left-5' : 'left-1'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(property)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDelete(property.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Property Form Modal ────────────────────────────────────────────────────

function PropertyFormModal({
  form,
  setForm,
  amenitiesInput,
  setAmenitiesInput,
  isEditing,
  saving,
  onSave,
  onCancel,
}: {
  form: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>;
  setForm: React.Dispatch<React.SetStateAction<typeof form>>;
  amenitiesInput: string;
  setAmenitiesInput: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  const inputClass =
    'w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 placeholder-slate-500 focus:outline-none focus:border-white/30';
  const labelClass = 'block text-xs text-slate-400 mb-1';
  const sectionClass = 'space-y-3';

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl mx-4 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">
            {isEditing ? 'Edit Property' : 'Add Property'}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Basic */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Basic</h3>
            <div className={sectionClass}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. R&F Princess Cove" />
                </div>
                <div>
                  <label className={labelClass}>Developer *</label>
                  <input className={inputClass} value={form.developer} onChange={(e) => update('developer', e.target.value)} placeholder="e.g. R&F Group" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Location *</label>
                  <input className={inputClass} value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Johor Bahru" />
                </div>
                <div>
                  <label className={labelClass}>Area *</label>
                  <input className={inputClass} value={form.area} onChange={(e) => update('area', e.target.value)} placeholder="e.g. Tanjung Puteri" />
                </div>
              </div>
            </div>
          </div>

          {/* Type */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Type</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Property Type</label>
                <select className={inputClass} value={form.type} onChange={(e) => update('type', e.target.value)}>
                  <option value="condo">Condo</option>
                  <option value="landed">Landed</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select className={inputClass} value={form.status} onChange={(e) => update('status', e.target.value)}>
                  <option value="completed">Completed</option>
                  <option value="new-launch">New Launch</option>
                  <option value="construction">Under Construction</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Tenure</label>
                <select className={inputClass} value={form.tenure} onChange={(e) => update('tenure', e.target.value)}>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Pricing</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Price RM *</label>
                <input className={inputClass} type="number" value={form.priceRM || ''} onChange={(e) => update('priceRM', Number(e.target.value))} placeholder="e.g. 500000" />
              </div>
              <div>
                <label className={labelClass}>Max Price RM</label>
                <input className={inputClass} type="number" value={form.priceMaxRM ?? ''} onChange={(e) => update('priceMaxRM', e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 1200000" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Details</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Beds</label>
                <input className={inputClass} value={form.beds} onChange={(e) => update('beds', e.target.value)} placeholder="e.g. 2-3" />
              </div>
              <div>
                <label className={labelClass}>Baths</label>
                <input className={inputClass} value={form.baths} onChange={(e) => update('baths', e.target.value)} placeholder="e.g. 2-3" />
              </div>
              <div>
                <label className={labelClass}>Size (sqft)</label>
                <input className={inputClass} value={form.size} onChange={(e) => update('size', e.target.value)} placeholder="e.g. 800-1400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className={labelClass}>Yield %</label>
                <input className={inputClass} type="number" step="0.1" value={form.yieldPercent ?? ''} onChange={(e) => update('yieldPercent', e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 6.5" />
              </div>
              <div>
                <label className={labelClass}>Distance to RTS</label>
                <input className={inputClass} value={form.rtsDistance ?? ''} onChange={(e) => update('rtsDistance', e.target.value || null)} placeholder="e.g. 1 km" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Content</h3>
            <div className={sectionClass}>
              <div>
                <label className={labelClass}>Description</label>
                <textarea className={`${inputClass} min-h-[80px]`} value={form.description ?? ''} onChange={(e) => update('description', e.target.value || null)} placeholder="Property description..." />
              </div>
              <div>
                <label className={labelClass}>Amenities (comma-separated)</label>
                <input className={inputClass} value={amenitiesInput} onChange={(e) => setAmenitiesInput(e.target.value)} placeholder="e.g. Pool, Gym, Tennis Court, BBQ" />
              </div>
            </div>
          </div>

          {/* Media */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Media</h3>
            <div className={sectionClass}>
              <div>
                <label className={labelClass}>Virtual Tour URL</label>
                <input className={inputClass} value={form.tourUrl ?? ''} onChange={(e) => update('tourUrl', e.target.value || null)} placeholder="https://..." />
              </div>
              <div>
                <label className={labelClass}>WhatsApp URL</label>
                <input className={inputClass} value={form.whatsappUrl ?? ''} onChange={(e) => update('whatsappUrl', e.target.value || null)} placeholder="https://wa.me/..." />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Settings</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                onClick={() => update('published', !form.published)}
                className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative ${
                  form.published ? 'bg-emerald-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    form.published ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
              <span className="text-sm text-slate-300">Published</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2 text-sm bg-white text-slate-900 font-medium rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : isEditing ? 'Update Property' : 'Create Property'}
          </button>
        </div>
      </div>
    </div>
  );
}
