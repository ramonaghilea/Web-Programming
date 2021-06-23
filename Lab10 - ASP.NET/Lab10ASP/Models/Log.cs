using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab10ASP.Models
{
    public class Log
    {
        public int logId { get; set; }
        public string type { get; set; }
        public string severity { get; set; }
        public DateTime dateOfLog { get; set; }
        public int userId { get; set; }
        public string message { get; set; }
    }
}
