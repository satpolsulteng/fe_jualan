import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    History,
    Plus,
    Search,
    ChevronRight,
    ArrowUpRight,
    User,
    DollarSign,
    CreditCard,
    AlertCircle,
    Calendar,
    Image as ImageIcon,
    Trash2,
    Edit2,
    Check
} from 'lucide-react';
import { getProducts, getTransactions, getRecap, createProduct, createTransaction, updateTransactionStatus, updateProduct, deleteTransaction, deleteProduct } from '@/services/jualanService';
import dayjs from 'dayjs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const JualanApp: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'recap' | 'products' | 'sale' | 'history'>('sale');
    const [products, setProducts] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [recap, setRecap] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [p, t, r] = await Promise.all([
                getProducts(),
                getTransactions(),
                getRecap()
            ]);
            setProducts(p);
            setTransactions(t);
            setRecap(r);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 md:pb-8">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-4 md:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <ShoppingCart className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Kasir Pintar</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pengelolaan Jualan & Transaksi</p>
                        </div>
                    </div>

                    <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {[
                            { id: 'sale', icon: ShoppingCart, label: 'Jual' },
                            { id: 'products', icon: Package, label: 'Produk' },
                            { id: 'history', icon: History, label: 'Riwayat' },
                            { id: 'recap', icon: LayoutDashboard, label: 'Rekap' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    activeTab === tab.id
                                        ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400"
                                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                )}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 md:px-8">
                {activeTab === 'sale' && (
                    loading ? <SaleSkeleton /> : <SaleSection products={products} onTransactionSuccess={fetchInitialData} showToast={showToast} />
                )}
                {activeTab === 'products' && (
                    loading ? <ProductSkeleton /> : <ProductSection products={products} onUpdate={fetchInitialData} showToast={showToast} />
                )}
                {activeTab === 'history' && (
                    loading ? <HistorySkeleton /> : <HistorySection transactions={transactions} onUpdate={fetchInitialData} showToast={showToast} />
                )}
                {activeTab === 'recap' && (
                    loading ? <RecapSkeleton /> : <RecapSection recap={recap} />
                )}
            </main>

            {/* Mobile Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 py-3">
                <div className="flex items-center justify-between">
                    {[
                        { id: 'sale', icon: ShoppingCart, label: 'Jual' },
                        { id: 'products', icon: Package, label: 'Produk' },
                        { id: 'history', icon: History, label: 'Riwayat' },
                        { id: 'recap', icon: LayoutDashboard, label: 'Rekap' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-colors duration-200",
                                activeTab === tab.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                            )}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className={cn(
                        "px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border",
                        toast.type === 'success' ? "bg-emerald-500/90 text-white border-emerald-400" : "bg-red-500/90 text-white border-red-400"
                    )}>
                        {toast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-bold text-sm">{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// Sub-components will be defined here or in separate files.
// For brevity in this thought, I'll start defining them inside index.tsx or split if it gets too big.
// I'll create the sub-components now.

const SaleSection: React.FC<{ products: any[], onTransactionSuccess: () => void, showToast: (m: string, t?: any) => void }> = ({ products, onTransactionSuccess, showToast }) => {
    const [cart, setCart] = useState<any[]>([]);
    const [buyerName, setBuyerName] = useState('');
    const [paymentStatus, setPaymentStatus] = useState<'cash' | 'qris' | 'utang'>('cash');
    const [isPaidFull, setIsPaidFull] = useState(true);
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileCart, setShowMobileCart] = useState(false);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToCart = (product: any) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        showToast(`Berhasil menambah ${product.name}`);
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart(cart.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const remaining = isPaidFull ? 0 : Math.max(0, total - amountPaid);

    const handleSubmit = async () => {
        if (!buyerName || cart.length === 0) return alert('Nama pembeli dan produk harus diisi');

        try {
            await createTransaction({
                buyer_name: buyerName,
                payment_status: paymentStatus,
                is_paid_full: paymentStatus === 'utang' ? isPaidFull : true,
                remaining_balance: paymentStatus === 'utang' ? remaining : 0,
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price_at_sale: item.price
                }))
            });
            setCart([]);
            setBuyerName('');
            onTransactionSuccess();
            setShowMobileCart(false);
            showToast('Transaksi Berhasil Disimpan!');
        } catch (error) {
            showToast('Gagal menyimpan transaksi', 'error');
        }
    };

    const CartContent = () => (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl md:rounded-none overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-indigo-500" />
                    Keranjang Belanja
                </h2>
                <button onClick={() => setShowMobileCart(false)} className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                    <ChevronRight className="w-6 h-6 rotate-90" />
                </button>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {cart.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingCart className="w-10 h-10 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">Keranjang masih kosong</p>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-2xl border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all">
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold truncate">{item.name}</h4>
                                <p className="text-xs text-indigo-500 font-bold">Rp {new Intl.NumberFormat('id-ID').format(item.price)}</p>
                            </div>
                            <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-100 dark:border-slate-700">
                                <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors font-bold">-</button>
                                <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors font-bold">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 space-y-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Nama Pembeli</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                        placeholder="Masukkan nama pelanggan..."
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Metode Pembayaran</label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'cash', label: 'Cash', icon: DollarSign },
                            { id: 'qris', label: 'QRIS', icon: CreditCard },
                            { id: 'utang', label: 'Utang', icon: AlertCircle },
                        ].map(m => (
                            <button
                                key={m.id}
                                onClick={() => setPaymentStatus(m.id as any)}
                                className={cn(
                                    "flex flex-col items-center gap-1.5 py-3 border rounded-2xl transition-all duration-200",
                                    paymentStatus === m.id
                                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30 -translate-y-0.5"
                                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-indigo-200 dark:hover:border-indigo-900"
                                )}
                            >
                                <m.icon className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {paymentStatus === 'utang' && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <input
                                type="checkbox"
                                id="paidFull"
                                checked={isPaidFull}
                                onChange={(e) => setIsPaidFull(e.target.checked)}
                                className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="paidFull" className="text-sm font-bold text-slate-700 dark:text-slate-300">Bayar Lunas Langsung?</label>
                        </div>
                        {!isPaidFull && (
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Jumlah Dibayar Sekarang</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">Rp</span>
                                    <input
                                        type="number"
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-black text-lg"
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(Number(e.target.value))}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Sisa Hutang:</span>
                                    <span className="text-red-500 font-black">Rp {new Intl.NumberFormat('id-ID').format(remaining)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Total Tagihan</span>
                        <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                            Rp {new Intl.NumberFormat('id-ID').format(total)}
                        </span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={cart.length === 0}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:shadow-none text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        Bayar Sekarang
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari produk atau pemilik..."
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            onClick={() => addToCart(product)}
                            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                        >
                            <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_SERVICE_KEPEGAWAIAN}/../storage/${product.image}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                                        <ImageIcon className="w-12 h-12" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] text-slate-700 dark:text-slate-200 font-black uppercase tracking-widest shadow-sm">
                                    {product.owner}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate mb-1">{product.name}</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-black text-base">
                                    Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Cart */}
            <div className="hidden lg:block">
                <div className="sticky top-24">
                    <CartContent />
                </div>
            </div>

            {/* Mobile Cart Toggle FAB */}
            <button
                onClick={() => setShowMobileCart(true)}
                className="lg:hidden fixed bottom-24 right-6 z-50 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center animate-bounce hover:animate-none transition-all active:scale-90"
            >
                <div className="relative">
                    <ShoppingCart className="w-8 h-8" />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                            {cart.length}
                        </span>
                    )}
                </div>
            </button>

            {/* Mobile Cart Drawer/Modal */}
            {showMobileCart && (
                <div className="lg:hidden fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="w-full max-h-[90vh] animate-in slide-in-from-bottom-full duration-500">
                        <CartContent />
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductSection: React.FC<{ products: any[], onUpdate: () => void, showToast: (m: string, t?: any) => void }> = ({ products, onUpdate, showToast }) => {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', price: '', owner: '', image: null as File | null });

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({ name: product.name, price: product.price.toString(), owner: product.owner, image: null });
        setShowModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('owner', formData.owner);

        if (editingProduct) {
            // Laravel expects _method spoofing for multipart updates
            // data.append('_method', 'PUT'); 
            // Wait, the route is actually defined as POST in my api.php, so POST should work fine.
            // But let's check if sending the image works.
        }

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, data);
                showToast('Produk berhasil diperbarui');
            } else {
                await createProduct(data);
                showToast('Produk baru ditambahkan');
            }
            setShowModal(false);
            setEditingProduct(null);
            setFormData({ name: '', price: '', owner: '', image: null });
            onUpdate();
        } catch (error) {
            showToast('Gagal menyimpan produk', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Yakin ingin menghapus produk ini?')) return;
        try {
            await deleteProduct(id);
            onUpdate();
            showToast('Produk dihapus');
        } catch (error) {
            showToast('Gagal menghapus produk', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Daftar Produk</h2>
                    <p className="text-slate-500">Kelola katalog produk jualan Anda</p>
                </div>
                <button
                    onClick={() => { setEditingProduct(null); setFormData({ name: '', price: '', owner: '', image: null }); setShowModal(true); }}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Produk Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                        <div className="h-48 bg-slate-100 dark:bg-slate-800 relative">
                            {product.image ? (
                                <img src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_SERVICE_KEPEGAWAIAN}/../storage/${product.image}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <ImageIcon className="w-16 h-16" />
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{product.name}</h3>
                                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                                        <User className="w-3 h-3" />
                                        {product.owner}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-indigo-600 font-bold">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-2 bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-xl font-bold">{editingProduct ? 'Edit Produk' : 'Tambah Produk'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Nama Produk</label>
                                <input
                                    type="text" required
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Harga</label>
                                <input
                                    type="number" required
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Pemilik</label>
                                <input
                                    type="text" required
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800"
                                    value={formData.owner}
                                    onChange={e => setFormData({ ...formData, owner: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Gambar Produk</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    onChange={e => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">Batal</button>
                                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const HistorySection: React.FC<{ transactions: any[], onUpdate: () => void, showToast: (m: string, t?: any) => void }> = ({ transactions, onUpdate, showToast }) => {
    const [selectedTx, setSelectedTx] = useState<any>(null);

    const handleStatusUpdate = async (tx: any, newStatus: string, paidFull: boolean) => {
        try {
            await updateTransactionStatus(tx.id, {
                payment_status: newStatus,
                is_paid_full: paidFull,
                remaining_balance: paidFull ? 0 : tx.remaining_balance
            });
            onUpdate();
            showToast('Status Pembayaran Diperbarui');
        } catch (error) {
            showToast('Gagal memperbarui status', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Hapus riwayat transaksi ini?')) return;
        try {
            await deleteTransaction(id);
            onUpdate();
            showToast('Transaksi dihapus');
        } catch (error) {
            showToast('Gagal menghapus transaksi', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Riwayat Transaksi</h2>
                    <p className="text-slate-500 font-medium">Pantau dan kelola semua transaksi penjualan</p>
                </div>
            </div>

            <div className="space-y-4">
                {transactions.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-20 text-center">
                        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <History className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Belum Ada Transaksi</h3>
                        <p className="text-slate-500">Transaksi yang Anda lakukan akan muncul di sini.</p>
                    </div>
                ) : (
                    transactions.map(tx => (
                        <div key={tx.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                                        <ShoppingCart className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-black text-lg text-slate-800 dark:text-slate-100">{tx.buyer_name}</h3>
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">#{tx.id}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-bold">{dayjs(tx.created_at).format('DD MMMM YYYY, HH:mm')}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-8 ml-auto">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Bayar</p>
                                        <p className="font-black text-xl text-slate-900 dark:text-slate-50">Rp {new Intl.NumberFormat('id-ID').format(tx.total_amount)}</p>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <div className={cn(
                                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border mb-2",
                                            tx.payment_status === 'cash' ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" :
                                                tx.payment_status === 'qris' ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20" :
                                                    "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20"
                                        )}>
                                            {tx.payment_status}
                                        </div>
                                        {tx.payment_status === 'utang' && (
                                            <div className={cn(
                                                "px-2 py-0.5 rounded-md text-[10px] font-black uppercase",
                                                tx.is_paid_full ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-rose-500 bg-rose-50 dark:bg-rose-500/10"
                                            )}>
                                                {tx.is_paid_full ? '● LUNAS' : `● SISA: Rp ${new Intl.NumberFormat('id-ID').format(tx.remaining_balance)}`}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {tx.payment_status === 'utang' && !tx.is_paid_full && (
                                            <button
                                                onClick={() => handleStatusUpdate(tx, 'utang', true)}
                                                className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 active:scale-95 transition-all"
                                            >
                                                Lunaskan
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setSelectedTx(selectedTx === tx.id ? null : tx.id)}
                                            className={cn(
                                                "p-3 rounded-xl transition-all duration-300 border",
                                                selectedTx === tx.id ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700 hover:border-indigo-300"
                                            )}
                                        >
                                            <ChevronRight className={cn("w-5 h-5 transition-transform duration-300", selectedTx === tx.id && "rotate-90")} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(tx.id)}
                                            className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-rose-100 dark:border-rose-500/20"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {selectedTx === tx.id && (
                                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Rincian Barang</h4>
                                        <span className="text-[10px] text-slate-400 font-bold">{tx.items.length} Item</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tx.items.map((item: any) => (
                                            <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                                                        {item.product.image ? (
                                                            <img src={item.product.image.startsWith('http') ? item.product.image : `${import.meta.env.VITE_API_SERVICE_KEPEGAWAIAN}/../storage/${item.product.image}`} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <ImageIcon className="w-full h-full p-3 text-slate-300" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm text-slate-700 dark:text-slate-200">{item.product.name}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Oleh: {item.product.owner}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-black text-slate-400 mb-0.5">{item.quantity} x Rp {new Intl.NumberFormat('id-ID').format(item.price_at_sale)}</p>
                                                    <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">Rp {new Intl.NumberFormat('id-ID').format(item.quantity * item.price_at_sale)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const RecapSection: React.FC<{ recap: any }> = ({ recap }) => {
    if (!recap) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Rekapitulasi</h2>
                    <p className="text-slate-500">Performa penjualan bulan ini</p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span className="font-bold text-sm">{dayjs().format('MMMM YYYY')}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-2">Total Pendapatan</p>
                        <h3 className="text-3xl font-black mb-4">Rp {new Intl.NumberFormat('id-ID').format(recap.monthly.total_revenue || 0)}</h3>
                        <div className="flex items-center gap-1 text-xs font-bold bg-white/20 w-fit px-2 py-1 rounded-lg">
                            <ArrowUpRight className="w-3 h-3" />
                            Target Tercapai
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Transaksi</p>
                    <h3 className="text-3xl font-black mb-4">{recap.monthly.total_transactions || 0}</h3>
                    <div className="flex items-center gap-2 text-slate-500">
                        <div className="w-8 h-1 bg-indigo-500 rounded-full"></div>
                        <span className="text-xs font-bold uppercase">Bulan Ini</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
                    <p className="text-red-400 text-sm font-bold uppercase tracking-widest mb-2">Total Piutang (Hutang)</p>
                    <h3 className="text-3xl font-black mb-4 text-red-500">Rp {new Intl.NumberFormat('id-ID').format(recap.monthly.total_debt || 0)}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-red-500/80">
                        <AlertCircle className="w-3 h-3" />
                        Perlu Ditagih
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold">Kinerja Pemilik Produk</h3>
                    <p className="text-sm text-slate-500">Rekapitulasi berdasarkan kepemilikan barang</p>
                </div>
                <div className="p-8 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                                <th className="pb-4">Pemilik</th>
                                <th className="pb-4">Item Terjual</th>
                                <th className="pb-4">Total Penjualan</th>
                                <th className="pb-4 text-right">Frekuensi Transaksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recap.owners.map((owner: any, idx: number) => (
                                <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-indigo-600">
                                                {owner.owner.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-700 dark:text-slate-200">{owner.owner}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 font-medium">{owner.items_sold} Unit</td>
                                    <td className="py-6">
                                        <span className="font-black text-indigo-600 dark:text-indigo-400">
                                            Rp {new Intl.NumberFormat('id-ID').format(owner.total_sales)}
                                        </span>
                                    </td>
                                    <td className="py-6 text-right">
                                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold">
                                            {owner.transaction_count} Kali
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Skeletons
const SaleSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                        <div className="aspect-square bg-slate-100 dark:bg-slate-800 animate-pulse" />
                        <div className="p-3 space-y-2">
                            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl animate-pulse" />
    </div>
);

const ProductSkeleton = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div className="space-y-2">
                <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
            <div className="h-12 w-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden h-80 animate-pulse" />
            ))}
        </div>
    </div>
);

const HistorySkeleton = () => (
    <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl animate-pulse" />
        ))}
    </div>
);

const RecapSkeleton = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] animate-pulse" />
            ))}
        </div>
        <div className="h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] animate-pulse" />
    </div>
);

export default JualanApp;
