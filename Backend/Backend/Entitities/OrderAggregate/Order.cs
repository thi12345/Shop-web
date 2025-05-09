﻿namespace Backend.Entitities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(IReadOnlyList<OrderItem> orderItems, string buyEmail, 
            Address shipToAddress, DeliveryMethod deliveryMethod, 
            decimal subTotal)
        {
            BuyEmail = buyEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
            SubTotal = subTotal;



        }

        public string? BuyEmail { get; set; }
        public DateTimeOffset? OrderDate { get; set; } = DateTimeOffset.Now;
        public Address? ShipToAddress { get; set; }
        public DeliveryMethod? DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem>? OrderItems { get; set; }
        public decimal SubTotal { get; set; }
        public OrderStatus? Status { get; set; } = OrderStatus.Pending;
        public string? PaymentIntentId { get; set; }
        public decimal GetTotal()
        {
            return SubTotal + DeliveryMethod.Price;
        }
    }
}
