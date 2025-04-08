using Backend.Entitities;
using Backend.Specification;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(
            IQueryable<TEntity> inputQuery,
            ISpecification<TEntity> spec) 
        {
            var query = inputQuery;

            if (spec.Criteria != null)
            {
                // p => p.ProductTypeId = id
                query = query.Where(spec.Criteria); 
            }

            if (spec.OrderBy != null)
            {
                // p => p.ProductTypeId = id
                query = query.OrderBy(spec.OrderBy);
            }

            if (spec.OrderByDescending != null)
            {
                // p => p.ProductTypeId = id
                query = query.OrderByDescending(spec.OrderByDescending);
            }

            if (spec.IsPagingEnabled)
            {
                query = query.Skip(spec.Skip).Take(spec.Take);
            }

            query = spec.Includes.Aggregate(query,
                (current, include) => current.Include(include));
            return query;
        }
    }
}
