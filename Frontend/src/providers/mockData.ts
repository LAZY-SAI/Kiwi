export interface PaintOrder {
    id: number;
    customerName: string;
    orderType: string;
    orderDate: string;
    description: string;
}

export const MOCK_ORDERS: PaintOrder[] = [
    {
        id: 1,
        customerName: "Sherwin-Williams",
        orderType: "Bulk Purchase",
        orderDate: "2024-05-01",
        description: "Large shipment of Emerald Exterior Acrylic Latex paint."
    },
    {
        id: 2,
        customerName: "PPG Industries",
        orderType: "Sample Request",
        orderDate: "2024-05-03",
        description: "Samples of industrial protective coatings for testing."
    },
    {
        id: 3,
        customerName: "AkzoNobel",
        orderType: "Standard Order",
        orderDate: "2024-05-05",
        description: "Standard restock of Dulux interior emulsion paints."
    },
    {
        id: 4,
        customerName: "Nippon Paint",
        orderType: "Express Delivery",
        orderDate: "2024-05-07",
        description: "Urgent delivery of Weatherbond series for a commercial project."
    },
    {
        id: 5,
        customerName: "Benjamin Moore",
        orderType: "Subscription",
        orderDate: "2024-05-09",
        description: "Monthly recurring order of Regal Select Waterborne Interior paint."
    }
];
