using Backend.Entitities.OrderAggregate;
using System.Linq.Expressions;

namespace Backend.Specifications
{
    public class OrderWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrderWithItemsAndOrderingSpecification(string email) : base(o => o.BuyEmail  == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }
        public OrderWithItemsAndOrderingSpecification(int id, string email) 
            : base(o => o.Id == id && o.BuyEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}
