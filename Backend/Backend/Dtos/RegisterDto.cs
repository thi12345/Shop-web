using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("\t\r\n(?=^.{8,30}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}" +
            "{&quot;&quot;:;'?/&gt;.&lt;,]).*$",
            ErrorMessage = "Password must have 1 Uppercase, 1 Lowercase, 1 number, 1 special character and at least 6 characters")]
        public string Password { get; set; }
    }
}
