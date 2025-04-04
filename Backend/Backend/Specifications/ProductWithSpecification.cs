using Backend.Entitities;

namespace Backend.Specifications
{
    public class ProductWithSpecification : BaseSpecification<Product>
    {
        public ProductWithSpecification()
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
        public ProductWithSpecification(int id ):
            base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
