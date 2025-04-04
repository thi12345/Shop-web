using System.Linq.Expressions;
using System.Collections.Generic;
using System;

namespace Backend.Specification
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get;}
    }
}
