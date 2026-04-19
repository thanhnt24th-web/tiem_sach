// --- Initial Data ---
const DEFAULT_BOOKS = [
    { id: '1', title: 'Bao Giờ Cho Đến Ngày Xưa', author: 'Nhiều tác giả', price: 150000, quantity: 50, category: 'Văn học', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/9/7/9786326062373_1_1_1.jpg' },
    { id: '2', title: 'Hạ Thanh Hải Yên', author: 'Nhiều tác giả', price: 125000, quantity: 30, category: 'Tiểu thuyết', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/b/_/b_a-_o-h_-thanh-h_i-y_n_b_a-tr_c.jpg' },
    { id: '3', title: 'Những Ký Ức Điện Biên', author: 'Nhiều tác giả', price: 142000, quantity: 20, category: 'Lịch sử', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/k/i/ki-niem-70-nam-chien-thang-dien-bien-phu_nhung-ki-uc-dien-bien_bia.jpg' },
    { id: '4', title: 'Dế Mèn Phiêu Lưu Ký', author: 'Tô Hoài', price: 180000, quantity: 15, category: 'Văn học', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/d/e/de-men-50k_1.jpg' },
    { id: '5', title: 'Logistics Và Quản Trị Chuỗi Cung Ứng', author: 'Nhiều tác giả', price: 110000, quantity: 45, category: 'Kinh tế', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/l/o/logistic-v_-qu_n-tr_-chu_i-cung-_ng---b_a-1.jpg' },
    { id: '6', title: 'Hồ Điệp Và Kình Ngư', author: 'Nhiều tác giả', price: 135000, quantity: 25, category: 'Tiểu thuyết', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/b/i/bia-2d_ho-diep-va-kinh-ngu_17307.jpg' },
    { id: '7', title: 'Khoa Học Về Các Loài Côn Trùng', author: 'Nhiều tác giả', price: 120000, quantity: 10, category: 'Khoa học', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935212370288.jpg' },
    { id: '8', title: 'Phúc Âm Của Loài Cá Chình', author: 'Nhiều tác giả', price: 165000, quantity: 12, category: 'Văn học', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935095633258.jpg' },
    { id: '9', title: 'Khoa Học Của Các Loài Côn Trùng', author: 'Nhiều tác giả', price: 199000, quantity: 8, category: 'Khoa học', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935212370257.jpg' },
    { id: '10', title: 'Chiến Tranh Tiền Tệ', author: 'Nhiều tác giả', price: 95000, quantity: 100, category: 'Kinh tế', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/z/7/z7601180554753_9603576612b9762bc2d5ac7b1a2d434b.jpg' },
    { id: '11', title: 'Cong Ăn Cong Thẳng Ăn Thẳng', author: 'Nhiều tác giả', price: 250000, quantity: 5, category: 'Văn học', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/9/7/9786044722061.jpg' },
    { id: '12', title: 'Tâm Lý Học Đường', author: 'Nhiều tác giả', price: 120000, quantity: 60, category: 'Tâm lý', coverUrl: 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935236436175.jpg' },
];

const VOUCHERS = [
    { code: 'SACHMOI', discount: 0.1, description: 'Giảm 10% cho khách hàng mới' },
    { code: 'HOANGGIA', discount: 0.2, description: 'Giảm 20% cho đơn hàng trên 500k', minPurchase: 500000 },
    { code: 'TRIAN', discount: 0.15, description: 'Giảm 15% tri ân khách hàng' },
    { code: 'TIEMSACH30/4', fixedAmount: 50000, description: 'Giảm 50.000đ cho đơn hàng từ 200k', minPurchase: 200000, expiryDate: '2026-04-30T23:59:59' },
    { code: 'KHACHMOI', fixedAmount: 50000, description: 'Giảm 50.000đ phí vận chuyển cho khách hàng mới', isShippingDiscount: true },
];

// --- Application State ---
let books = JSON.parse(localStorage.getItem('books')) || DEFAULT_BOOKS;
let currentView = 'store';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let isAdmin = localStorage.getItem('isAdmin') === 'true';
let user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Nguyễn Văn A',
    email: 'example@gmail.com',
    phone: '0123456789',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    joined: '06/04/2026',
    totalPurchases: 25
};
let importHistory = JSON.parse(localStorage.getItem('importHistory')) || [];
let salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || [];
let paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
let selectedVoucher = null;
let searchTerm = '';
let activeAdminTab = 'import';

// --- DOM Elements ---
const mainContent = document.getElementById('main-content');
const cartCount = document.getElementById('cart-count');
const navBtns = document.querySelectorAll('.nav-btn');
const adminLoginModal = document.getElementById('admin-login-modal');
const editBookModal = document.getElementById('edit-book-modal');
const editProfileModal = document.getElementById('edit-profile-modal');
const confirmModal = document.getElementById('confirm-modal');
const toastContainer = document.getElementById('toast-container');

// --- Functions ---

function saveToStorage() {
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('importHistory', JSON.stringify(importHistory));
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory));
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type} animate__animated animate__fadeInDown`;

    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'info') icon = 'fa-info-circle';

    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
        <div class="toast-message">${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.replace('animate__fadeInDown', 'animate__fadeOutUp');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function customConfirm(title, message, onConfirm) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    confirmModal.style.display = 'flex';

    const yesBtn = document.getElementById('confirm-yes');
    const newYesBtn = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

    newYesBtn.onclick = () => {
        onConfirm();
        closeConfirmModal();
    };
}

function closeConfirmModal() {
    confirmModal.style.display = 'none';
}

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

function switchView(view) {
    if (view === 'profile' && !isLoggedIn) {
        showToast('Vui lòng đăng nhập để xem hồ sơ', 'info');
        currentView = 'login';
    } else {
        currentView = view;
    }
    render();

    navBtns.forEach(btn => {
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function render() {
    mainContent.innerHTML = '';

    // Dynamic Navigation
    const profileBtn = document.getElementById('nav-profile');
    const loginText = document.getElementById('login-text');
    const loginBtn = document.getElementById('nav-login');

    if (isLoggedIn) {
        if (profileBtn) profileBtn.style.display = 'flex';
        if (loginText) loginText.textContent = 'Đăng xuất';
        if (loginBtn) loginBtn.querySelector('i').className = 'fa-solid fa-right-from-bracket';
    } else {
        if (profileBtn) profileBtn.style.display = 'none';
        if (loginText) loginText.textContent = 'Đăng nhập';
        if (loginBtn) loginBtn.querySelector('i').className = 'fa-solid fa-key';
        if (currentView === 'profile') currentView = 'store';
    }

    if (currentView === 'store') {
        renderStore();
    } else if (currentView === 'cart') {
        renderCart();
    } else if (currentView === 'admin') {
        if (isAdmin) {
            renderAdmin();
        } else {
            switchView('store');
            showAdminLogin();
        }
    } else if (currentView === 'profile') {
        renderProfile();
    } else if (currentView === 'login') {
        renderLogin();
    }

    updateCartBadge();
    saveToStorage();
}

function updateCartBadge() {
    const total = cart.reduce((acc, item) => acc + item.cartQuantity, 0);
    if (total > 0) {
        cartCount.style.display = 'flex';
        cartCount.textContent = total;
    } else {
        cartCount.style.display = 'none';
    }
}

// --- Views ---

function renderStore() {
    const filteredBooks = books.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    let html = `
        <div class="store-header animate__animated animate__fadeIn">
            <h2>Danh sách sản phẩm</h2>
            <div class="search-bar">
                <i class="fa-solid fa-magnifying-glass" style="color: var(--slate-400);"></i>
                <input type="text" id="search-input" placeholder="Tìm sách..." value="${searchTerm}">
            </div>
        </div>
    `;

    if (selectedVoucher) {
        html += `
            <div class="animate__animated animate__pulse" style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1rem; border-radius: 12px; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong style="color: #166534;"><i class="fa-solid fa-ticket"></i> Đang áp dụng: ${selectedVoucher.code}</strong>
                    <p style="font-size: 0.875rem; color: #15803d;">${selectedVoucher.description}</p>
                </div>
                <button onclick="removeVoucher()" style="color: #166534; font-weight: 700; background: none; border: none; cursor: pointer;">Gỡ bỏ</button>
            </div>
        `;
    }

    html += `<div class="book-grid">`;
    filteredBooks.forEach((book, index) => {
        html += `
            <div class="book-card animate__animated animate__fadeInUp" style="animation-delay: ${index * 0.05}s">
                <div class="book-img-container">
                    <img src="${book.coverUrl}" alt="${book.title}" onerror="this.src='https://picsum.photos/seed/book/400/600'">
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-price-row">
                        <div class="book-price">${formatPrice(book.price)}</div>
                        <div class="book-stock">Kho: ${book.quantity}</div>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${book.id}')">
                        <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        `;
    });
    html += `</div>`;

    mainContent.innerHTML = html;

    document.getElementById('search-input').addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderStore();
    });
}

function renderCart() {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
    let discount = 0;
    let shipping = 50000;
    let shippingDiscount = 0;

    if (selectedVoucher) {
        if (selectedVoucher.isShippingDiscount) {
            shippingDiscount = Math.min(selectedVoucher.fixedAmount, shipping);
        } else {
            if (selectedVoucher.discount) discount = subtotal * selectedVoucher.discount;
            else if (selectedVoucher.fixedAmount) discount = selectedVoucher.fixedAmount;
        }
    }

    const total = subtotal - discount + (shipping - shippingDiscount);

    let html = `
        <div class="cart-container animate__animated animate__fadeInRight">
            <h2 style="margin-bottom: 1.5rem; font-weight: 900; text-transform: uppercase;"><i class="fa-solid fa-cart-shopping"></i> Giỏ hàng của bạn</h2>
    `;

    if (cart.length === 0) {
        html += `<p style="text-align: center; color: var(--slate-400); padding: 2rem;">Giỏ hàng trống</p>`;
    } else {
        cart.forEach(item => {
            html += `
                <div class="cart-item">
                    <img src="${item.coverUrl}" style="width: 60px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div class="cart-item-info">
                        <div style="font-weight: 700;">${item.title}</div>
                        <div style="color: var(--primary-dark); font-weight: 900;">${formatPrice(item.price)}</div>
                    </div>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                        <span style="font-weight: 700; min-width: 20px; text-align: center;">${item.cartQuantity}</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                        <button onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: #ef4444; cursor: pointer; margin-left: 10px;"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `;
        });

        html += `
            <div class="checkout-section">
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem;">Mã giảm giá</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="voucher-input" placeholder="Nhập mã..." style="flex: 1; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--slate-200);">
                        <button onclick="applyVoucher()" style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer;">Áp dụng</button>
                    </div>
                </div>
                <div class="checkout-row"><span>Tạm tính:</span> <span>${formatPrice(subtotal)}</span></div>
                ${discount > 0 ? `<div class="checkout-row" style="color: #16a34a;"><span>Giảm giá:</span> <span>-${formatPrice(discount)}</span></div>` : ''}
                <div class="checkout-row"><span>Phí vận chuyển:</span> <span>${formatPrice(shipping)}</span></div>
                ${shippingDiscount > 0 ? `<div class="checkout-row" style="color: #16a34a;"><span>Giảm phí VC:</span> <span>-${formatPrice(shippingDiscount)}</span></div>` : ''}
                <div class="checkout-row total-row"><span>Tổng cộng:</span> <span>${formatPrice(total)}</span></div>
                <button class="submit-btn" onclick="checkout()" style="margin-top: 2rem; font-size: 1.125rem;">THANH TOÁN NGAY</button>
            </div>
        `;
    }

    html += `</div>`;
    mainContent.innerHTML = html;
}

function renderAdmin() {
    let html = `
        <div class="admin-section animate__animated animate__fadeIn">
            <h2 style="margin-bottom: 1.5rem; font-weight: 900;"><i class="fa-solid fa-screwdriver-wrench"></i> QUẢN LÝ CỬA HÀNG</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 2rem; flex-wrap: wrap;">
                <button class="nav-btn ${activeAdminTab === 'import' ? 'active' : ''}" onclick="setAdminTab('import')" style="color: #333"><i class="fa-solid fa-plus"></i> Nhập hàng</button>
                <button class="nav-btn ${activeAdminTab === 'inventory' ? 'active' : ''}" onclick="setAdminTab('inventory')" style="color: #333"><i class="fa-solid fa-warehouse"></i> Kho hàng</button>
                <button class="nav-btn ${activeAdminTab === 'importHistory' ? 'active' : ''}" onclick="setAdminTab('importHistory')" style="color: #333"><i class="fa-solid fa-file-import"></i> Lịch sử nhập</button>
                <button class="nav-btn ${activeAdminTab === 'history' ? 'active' : ''}" onclick="setAdminTab('history')" style="color: #333"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử bán</button>
            </div>
    `;

    if (activeAdminTab === 'import') {
        html += `
            <form onsubmit="addBook(event)" class="animate__animated animate__fadeIn" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="form-group"><label>Tên sách</label><input type="text" id="new-title" required></div>
                <div class="form-group"><label>Giá bán</label><input type="number" id="new-price" required></div>
                <div class="form-group"><label>Tác giả</label><input type="text" id="new-author"></div>
                <div class="form-group"><label>Số lượng</label><input type="number" id="new-qty" value="1"></div>
                <div class="form-group" style="grid-column: span 2;">
                    <label>Ảnh sản phẩm</label>
                    <div style="display: flex; gap: 10px; flex-direction: column;">
                        <input type="text" id="new-url" placeholder="Dán link ảnh vào đây...">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 0.75rem; color: var(--slate-400);">Hoặc tải lên từ máy:</span>
                            <input type="file" id="new-file" accept="image/*" style="font-size: 0.75rem;">
                        </div>
                    </div>
                </div>
                <button type="submit" class="submit-btn" style="grid-column: span 2;">THÊM VÀO KHO</button>
            </form>
        `;
    } else if (activeAdminTab === 'inventory') {
        html += `
            <div class="animate__animated animate__fadeIn">
                <table>
                    <thead>
                        <tr><th>Sản phẩm</th><th>Giá</th><th>Kho</th><th style="text-align: right;">Hành động</th></tr>
                    </thead>
                    <tbody>
                        ${books.map(b => `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <img src="${b.coverUrl}" class="book-thumb" onerror="this.src='https://picsum.photos/seed/book/400/600'">
                                        <span>${b.title}</span>
                                    </div>
                                </td>
                                <td>${formatPrice(b.price)}</td>
                                <td>${b.quantity}</td>
                                <td style="text-align: right;">
                                    <button onclick="openEditModal('${b.id}')" style="background:none; border:none; cursor:pointer; color: #3b82f6; margin-right: 10px;"><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button onclick="confirmDeleteBook('${b.id}')" style="background:none; border:none; cursor:pointer; color: #ef4444;"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else if (activeAdminTab === 'importHistory') {
        html += `
            <div class="animate__animated animate__fadeIn">
                <h3 style="margin: 1rem 0;">Lịch sử nhập hàng</h3>
                <table>
                    <thead><tr><th>Thời gian</th><th>Sản phẩm</th><th>Số lượng</th><th>Đơn giá</th><th style="text-align: right;">Hành động</th></tr></thead>
                    <tbody>
                        ${importHistory.map(h => `
                            <tr>
                                <td>${h.date}</td>
                                <td>${h.title}</td>
                                <td>${h.quantity}</td>
                                <td>${formatPrice(h.price)}</td>
                                <td style="text-align: right;">
                                    <button onclick="confirmDeleteHistory('import', ${h.id})" style="background:none; border:none; cursor:pointer; color: #ef4444;"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="5" style="text-align:center">Chưa có dữ liệu nhập hàng</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    } else if (activeAdminTab === 'history') {
        html += `
            <div class="animate__animated animate__fadeIn">
                <h3 style="margin: 1rem 0;">Lịch sử bán hàng</h3>
                <table>
                    <thead><tr><th>Thời gian</th><th>Sản phẩm</th><th>Tổng tiền</th><th style="text-align: right;">Hành động</th></tr></thead>
                    <tbody>
                        ${salesHistory.map(h => `
                            <tr>
                                <td>${h.date}</td>
                                <td>${h.title}</td>
                                <td>${formatPrice(h.price)}</td>
                                <td style="text-align: right;">
                                    <button onclick="confirmDeleteHistory('sales', ${h.id})" style="background:none; border:none; cursor:pointer; color: #ef4444;"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="4" style="text-align:center">Chưa có dữ liệu</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    }

    html += `</div>`;
    mainContent.innerHTML = html;
}

function renderProfile() {
    let html = `
        <div class="cart-container animate__animated animate__fadeInUp" style="max-width: 600px;">
            <div style="display: flex; justify-content: flex-end; margin-bottom: -2rem;">
                <button onclick="openEditProfileModal()" style="background: var(--slate-100); border: none; padding: 8px 15px; border-radius: 8px; font-weight: 700; cursor: pointer; color: var(--slate-600); font-size: 0.875rem;">
                    <i class="fa-solid fa-user-pen"></i> Sửa hồ sơ
                </button>
            </div>
            <div style="text-align: center; margin-bottom: 2rem;">
                <img src="${user.avatar}" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid var(--primary); margin-bottom: 1rem; object-fit: cover;">
                <h2 style="font-weight: 900;">${user.name}</h2>
                <p style="color: var(--slate-500);">${user.email}</p>
            </div>
            <div style="background: var(--slate-50); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <strong>Số điện thoại:</strong> <span>${user.phone}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <strong>Ngày tham gia:</strong> <span>${user.joined}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Tổng đơn hàng:</strong> <span>${user.totalPurchases}</span>
                </div>
            </div>
            <h3 style="margin-bottom: 1rem; font-weight: 900;">ĐƠN HÀNG GẦN ĐÂY</h3>
            ${salesHistory.length === 0 ? '<p style="color: var(--slate-400)">Chưa có đơn hàng nào</p>' :
            salesHistory.map(h => `
                    <div style="padding: 10px; border-bottom: 1px solid var(--slate-100); font-size: 0.875rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>${h.date}</strong>
                            <span style="color: var(--primary-dark); font-weight: 700;">${formatPrice(h.price)}</span>
                        </div>
                        <div style="color: var(--slate-500);">${h.title}</div>
                    </div>
                `).join('')
        }
        </div>
    `;
    mainContent.innerHTML = html;
}

function renderLogin() {
    mainContent.innerHTML = `
        <div class="modal-content animate__animated animate__fadeIn" style="margin: 0 auto;">
            <div class="modal-header">
                <h2 style="font-weight: 900;">ĐĂNG NHẬP</h2>
            </div>
            <div class="form-group"><label>Email</label><input type="email" placeholder="example@gmail.com"></div>
            <div class="form-group"><label>Mật khẩu</label><input type="password" placeholder="••••••••"></div>
            <button class="submit-btn" onclick="login()">ĐĂNG NHẬP</button>
            <p style="text-align: center; margin-top: 1rem; font-size: 0.875rem; color: var(--slate-500);">Chưa có tài khoản? <a href="#" style="color: var(--primary); font-weight: 700;">Đăng ký</a></p>
        </div>
    `;
}

// --- Actions ---

function addToCart(id) {
    const book = books.find(b => b.id === id);
    if (book.quantity <= 0) {
        showToast('Sản phẩm đã hết hàng!', 'error');
        return;
    }

    const existing = cart.find(item => item.id === id);
    if (existing) {
        if (existing.cartQuantity >= book.quantity) {
            showToast('Đã đạt giới hạn tồn kho!', 'error');
            return;
        }
        existing.cartQuantity++;
    } else {
        cart.push({ ...book, cartQuantity: 1 });
    }

    showToast(`Đã thêm "${book.title}" vào giỏ hàng!`);
    updateCartBadge();
    saveToStorage();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    updateCartBadge();
    saveToStorage();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    const book = books.find(b => b.id === id);
    if (item && book) {
        const newQty = item.cartQuantity + delta;
        if (newQty > 0 && newQty <= book.quantity) {
            item.cartQuantity = newQty;
            renderCart();
            updateCartBadge();
            saveToStorage();
        }
    }
}

function applyVoucher() {
    const code = document.getElementById('voucher-input').value.toUpperCase();
    const voucher = VOUCHERS.find(v => v.code === code);
    if (voucher) {
        selectedVoucher = voucher;
        showToast('Áp dụng mã giảm giá thành công!');
        renderCart();
    } else {
        showToast('Mã giảm giá không hợp lệ!', 'error');
    }
}

function removeVoucher() {
    selectedVoucher = null;
    showToast('Đã gỡ bỏ mã giảm giá', 'info');
    render();
}

function checkout() {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
    let discount = 0;
    let shipping = 50000;
    let shippingDiscount = 0;

    if (selectedVoucher) {
        if (selectedVoucher.isShippingDiscount) {
            shippingDiscount = Math.min(selectedVoucher.fixedAmount, shipping);
        } else {
            if (selectedVoucher.discount) discount = subtotal * selectedVoucher.discount;
            else if (selectedVoucher.fixedAmount) discount = selectedVoucher.fixedAmount;
        }
    }

    const total = subtotal - discount + (shipping - shippingDiscount);

    // Update stock
    cart.forEach(item => {
        const book = books.find(b => b.id === item.id);
        if (book) book.quantity -= item.cartQuantity;
    });

    // Record history
    const itemsText = cart.map(i => `${i.title} (x${i.cartQuantity})`).join(', ');
    salesHistory.unshift({
        id: Date.now(),
        title: itemsText,
        price: total,
        date: new Date().toLocaleString('vi-VN')
    });

    user.totalPurchases++;

    showToast('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
    cart = [];
    selectedVoucher = null;
    switchView('store');
}

function login() {
    isLoggedIn = true;
    saveToStorage();
    switchView('profile');
    showToast('Đăng nhập thành công!');
}

function logout() {
    isLoggedIn = false;
    isAdmin = false;
    saveToStorage();
    switchView('store');
    showToast('Đã đăng xuất', 'info');
}

function handleLoginClick() {
    if (isLoggedIn) {
        logout();
    } else {
        switchView('login');
    }
}

function showAdminLogin() {
    adminLoginModal.style.display = 'flex';
}

function closeAdminLogin() {
    adminLoginModal.style.display = 'none';
}

function handleAdminLogin(event) {
    event.preventDefault();
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;

    if (user === 'quanly' && pass === '123456') {
        isAdmin = true;
        closeAdminLogin();
        switchView('admin');
        showToast('Chào mừng quản lý!', 'success');
    } else {
        showToast('Sai thông tin quản lý!', 'error');
    }
}

function setAdminTab(tab) {
    activeAdminTab = tab;
    renderAdmin();
}

function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('new-title').value;
    const price = parseFloat(document.getElementById('new-price').value);
    const author = document.getElementById('new-author').value || 'Nhiều tác giả';
    const qty = parseInt(document.getElementById('new-qty').value) || 1;
    const urlInput = document.getElementById('new-url').value;
    const fileInput = document.getElementById('new-file').files[0];

    const processAdd = (imageUrl) => {
        const newBook = {
            id: Date.now().toString(),
            title,
            author,
            price,
            quantity: qty,
            category: 'Chung',
            coverUrl: imageUrl || 'https://picsum.photos/seed/book/400/600'
        };

        books.unshift(newBook);

        importHistory.unshift({
            id: Date.now(),
            title: title,
            quantity: qty,
            price: price,
            date: new Date().toLocaleString('vi-VN')
        });

        showToast('Đã thêm sách vào kho!');
        renderAdmin();
    };

    if (fileInput) {
        const reader = new FileReader();
        reader.onload = (e) => processAdd(e.target.result);
        reader.readAsDataURL(fileInput);
    } else {
        processAdd(urlInput);
    }
}

function confirmDeleteBook(id) {
    customConfirm('XOÁ SÁCH', 'Bạn có chắc chắn muốn xoá cuốn sách này khỏi kho hàng?', () => {
        books = books.filter(b => b.id !== id);
        showToast('Đã xoá sách thành công', 'info');
        renderAdmin();
    });
}

function openEditModal(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;

    document.getElementById('edit-id').value = book.id;
    document.getElementById('edit-title').value = book.title;
    document.getElementById('edit-price').value = book.price;
    document.getElementById('edit-author').value = book.author;
    document.getElementById('edit-qty').value = book.quantity;
    document.getElementById('edit-url').value = book.coverUrl;
    document.getElementById('edit-file').value = ''; // Reset file input

    editBookModal.style.display = 'flex';
}

function closeEditModal() {
    editBookModal.style.display = 'none';
}

function handleUpdateBook(event) {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const book = books.find(b => b.id === id);

    if (book) {
        const title = document.getElementById('edit-title').value;
        const price = parseFloat(document.getElementById('edit-price').value);
        const author = document.getElementById('edit-author').value;
        const qty = parseInt(document.getElementById('edit-qty').value);
        const urlInput = document.getElementById('edit-url').value;
        const fileInput = document.getElementById('edit-file').files[0];

        const processUpdate = (imageUrl) => {
            book.title = title;
            book.price = price;
            book.author = author;
            book.quantity = qty;
            book.coverUrl = imageUrl || urlInput;

            showToast('Cập nhật thông tin thành công!');
            closeEditModal();
            renderAdmin();
        };

        if (fileInput) {
            const reader = new FileReader();
            reader.onload = (e) => processUpdate(e.target.result);
            reader.readAsDataURL(fileInput);
        } else {
            processUpdate(urlInput);
        }
    }
}

function openEditProfileModal() {
    document.getElementById('profile-name').value = user.name;
    document.getElementById('profile-email').value = user.email;
    document.getElementById('profile-phone').value = user.phone;
    document.getElementById('profile-avatar-file').value = '';

    editProfileModal.style.display = 'flex';
}

function closeEditProfileModal() {
    editProfileModal.style.display = 'none';
}

function handleUpdateProfile(event) {
    event.preventDefault();
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const phone = document.getElementById('profile-phone').value;
    const fileInput = document.getElementById('profile-avatar-file').files[0];

    const processUpdate = (avatarUrl) => {
        user.name = name;
        user.email = email;
        user.phone = phone;
        if (avatarUrl) user.avatar = avatarUrl;

        showToast('Cập nhật hồ sơ thành công!');
        closeEditProfileModal();
        renderProfile();
        saveToStorage();
    };

    if (fileInput) {
        if (fileInput.size > 1024 * 1024) {
            showToast('Ảnh quá lớn! Vui lòng chọn ảnh dưới 1MB', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => processUpdate(e.target.result);
        reader.readAsDataURL(fileInput);
    } else {
        processUpdate();
    }
}

function confirmDeleteHistory(type, id) {
    const title = type === 'import' ? 'XOÁ LỊCH SỬ NHẬP' : 'XOÁ LỊCH SỬ BÁN';
    const message = 'Bạn có chắc chắn muốn xoá bản ghi lịch sử này?';

    customConfirm(title, message, () => {
        if (type === 'import') {
            importHistory = importHistory.filter(h => h.id !== id);
        } else {
            salesHistory = salesHistory.filter(h => h.id !== id);
        }
        showToast('Đã xoá bản ghi lịch sử', 'info');
        renderAdmin();
        saveToStorage();
    });
}

// --- Initial Render ---
render();
