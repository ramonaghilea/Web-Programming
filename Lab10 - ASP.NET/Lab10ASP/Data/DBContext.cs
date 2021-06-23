using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using MySQL.Data.EntityFrameworkCore;
using Lab10ASP.Models;

namespace Lab10ASP.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> AppUser { get; set; }

        public DbSet<Log> Log { get; set; }
    }
}

