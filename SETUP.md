# Mumbai Sports Store - Setup Instructions

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

3. **Start Backend Server**
```bash
cd backend
npm start
# or for development
npm run dev
```

4. **Open Website**
- Open `index.html` in your browser
- Or visit `http://localhost:5000` if serving through backend

### Admin Panel
- Access admin panel at: `http://localhost:5000/admin`
- View all orders, update status, and manage store

## 📁 Project Structure

```
mumbai-sports-store/
├── index.html              # Main store page
├── checkout.html           # Checkout form
├── styles.css              # Styling
├── script.js               # Frontend logic
├── README.md               # Documentation
├── SETUP.md                # This file
├── admin/
│   └── index.html          # Admin panel
└── backend/
    ├── server.js           # Express server
    ├── package.json        # Dependencies
    ├── .env                # Environment variables
    ├── models/
    │   └── Order.js        # Order model
    ├── routes/
    │   ├── orders.js       # Order routes
    │   └── admin.js        # Admin routes
    └── controllers/        # (Future use)
```

## 🔧 Configuration

### Environment Variables (.env)
```
MONGODB_URI=mongodb://localhost:27017/mumbai-sports-store
PORT=5000
JWT_SECRET=mumbai_sports_store_secret_key
```

## 🛒 Features

### Customer Features
- Browse products by category
- Add items to cart (persistent)
- Checkout with customer details
- Order confirmation

### Admin Features
- View all orders
- Update order status
- Order statistics
- Customer information

## 🔄 API Endpoints

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:orderId` - Get order by ID

### Admin
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/stats` - Get statistics

## 📱 Usage

1. **Customer Flow:**
   - Browse products on main page
   - Add items to cart
   - Click checkout
   - Fill customer details
   - Place order

2. **Admin Flow:**
   - Access `/admin`
   - View orders and statistics
   - Update order status
   - View customer details

## 🔒 Security Notes

- Add authentication for admin panel in production
- Validate all inputs
- Use HTTPS in production
- Secure MongoDB connection

## 🚀 Deployment

### Local Development
```bash
# Terminal 1 - Start MongoDB
mongod

# Terminal 2 - Start Backend
cd backend
npm run dev

# Terminal 3 - Serve Frontend (optional)
# Open index.html directly or use live server
```

### Production
- Deploy backend to Heroku/AWS/DigitalOcean
- Use MongoDB Atlas for database
- Serve frontend through CDN or same server

---

**Made with ❤️ in Mumbai** | Mumbai Sports Store © 2024