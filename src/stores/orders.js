import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: JSON.parse(localStorage.getItem('coffee_orders') || '[]')
  }),
  actions: {
    initSync() {
      window.addEventListener('storage', (e) => {
        if (e.key === 'coffee_orders') {
          this.orders = JSON.parse(e.newValue || '[]');
        }
      });
    },
    addOrder(orderData) {
      const order = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        ...orderData,
        status: 'pending', // pending -> priced -> accepted -> ready -> completed
        price: 0,
        createdAt: new Date().toISOString()
      };
      this.orders.push(order);
      this.saveOrders();
      return order.id;
    },
    updateOrderStatus(orderId, status) {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        this.saveOrders();
      }
    },
    setOrderPrice(orderId, price) {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.price = price;
        order.status = 'priced';
        this.saveOrders();
      }
    },
    clearCompletedOrders() {
      this.orders = this.orders.filter(o => o.status !== 'completed' && o.status !== 'done');
      this.saveOrders();
    },
    saveOrders() {
      localStorage.setItem('coffee_orders', JSON.stringify(this.orders));
    }
  }
})
