using Lab10ASP.Data;
using Lab10ASP.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;

namespace Lab10ASP.Controllers
{
    public class MainController : Controller
    {
        private readonly DBContext _context;

        private readonly ILogger<MainController> _logger;

        public MainController(DBContext context, ILogger<MainController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View("FilterLogs");
        }

        public string Test()
        {
            return "It's working";
        }

        public string Test1(string param1 = "hello", int param2 = 0)
        {
            return "Result: " + param1 + param2.ToString();
        }

        public ActionResult logIn(string usernameString, string passwordString)
        {
            try
            {
                // check if the username ans passsword are in the db
                List<AppUser> result = new List<AppUser>();
                result = _context.AppUser.Where(u => u.usernameString == usernameString && u.passwordString == passwordString).ToList();

                _logger.LogInformation(" > logIn - method entered. result size = {}", result.Count());
                _logger.LogInformation(" > logIn - method entered. username = {}", usernameString);
                _logger.LogInformation(" > logIn - method entered. userId = {}", result[0].id);

                if (result.Count() == 1)
                {
                    //init a new session
                    HttpContext.Session.Clear();
                    HttpContext.Session.SetString("username", usernameString);
                    HttpContext.Session.SetInt32("userId", result[0].id);

                    return Ok("logIn: success");
                }
                else
                    return BadRequest("Invalid Credentials");
            }
            catch(Exception e)
            {
                return BadRequest("Invalid Credentials");
            }
        }

        public string logOut()
        {
            HttpContext.Session.Clear();
            return "logOut: success";
        }

        public string getUsernameOnSession()
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return null;

            // get the userId from the session
            int userId = (int)HttpContext.Session.GetInt32("userId");

            List<AppUser> result = new List<AppUser>();
            result = _context.AppUser.Where(u => u.id == userId).ToList();

            return result[0].usernameString;
        }

        public int isLoggedIn()
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return 0;
            return 1;
        }

        public int getNumberLogs()
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return -1;

            List<Log> allLogs = new List<Log>();
            allLogs = _context.Log.ToList();
            return allLogs.Count();
        }

        public int getNumberLogsForUser()
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return -1;

            // get the userId from the session
            int userId = (int)HttpContext.Session.GetInt32("userId");

            List<Log> logsForUser = new List<Log>();
            logsForUser = _context.Log.Where(l => l.userId == userId).ToList();

            return logsForUser.Count();
        }

        public int getNumberLogsFiltered(string type, string severity)
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return -1;

            List<Log> filteredLogs = new List<Log>();

            if (type is null && severity is null)
                filteredLogs = _context.Log.ToList();
            else if (type is null)
                filteredLogs = _context.Log.Where(l => l.severity == severity).ToList();
            else if (severity is null)
                filteredLogs = _context.Log.Where(l => l.type == type).ToList();
            else
                filteredLogs = _context.Log.Where(l => l.type == type && l.severity == severity).ToList();

            return filteredLogs.Count();
        }

        public List<Log> getLogsWithTypeAndSeverity(string type, string severity, int pageNumber, int pageSize)
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return null;

            _logger.LogInformation(" > getLogsWithTypeAndSeverity - method entered.");

            List<Log> filteredLogs = new List<Log>();

            if (type is null && severity is null)
                filteredLogs = _context.Log.ToList();
            else if (type is null)
                filteredLogs = _context.Log.Where(l => l.severity == severity).ToList();
            else if (severity is null)
                filteredLogs = _context.Log.Where(l => l.type == type).ToList();
            else
                filteredLogs = _context.Log.Where(l => l.type == type && l.severity == severity).ToList();

            // take only the logs on the current page
            // start from offset and take pageSize elements
            var offset = (pageNumber - 1) * pageSize;
            var result = filteredLogs.Skip(offset).Take(pageSize).ToList();

            _logger.LogInformation(" > getLogsWithTypeAndSeverity - method finished.");
            return result;
        }

        public List<Log> getAllLogsPaginated(int pageNumber, int pageSize)
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return null;

            _logger.LogInformation(" > getAllLogsPaginated - method entered. userId on session = {}", HttpContext.Session.GetInt32("userId"));
            _logger.LogInformation(" > getAllLogsPaginated - method entered. username on session = {}", HttpContext.Session.GetString("username"));

            List<Log> allLogs = new List<Log>();

            allLogs = _context.Log.ToList();

            // take only the logs on the current page
            // start from offset and take pageSize elements
            var offset = (pageNumber - 1) * pageSize;
            var result = allLogs.Skip(offset).Take(pageSize).ToList();

            _logger.LogInformation(" > getAllLogsPaginated - method finished. userId on session = {}", HttpContext.Session.GetInt32("userId"));
            return result;
        }

        public List<Log> getLogsForUserPaginated(int pageNumber, int pageSize)
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return null;

            _logger.LogInformation(" > getLogsForUserPaginated - method entered. userId on session = {}", HttpContext.Session.GetInt32("userId"));

            // get the userId from the session
            int userId = (int)HttpContext.Session.GetInt32("userId");

            List<Log> logsForUser = new List<Log>();

            logsForUser = _context.Log.Where(l => l.userId == userId).ToList();

            // take only the logs on the current page
            // start from offset and take pageSize elements
            var offset = (pageNumber - 1) * pageSize;
            var result = logsForUser.Skip(offset).Take(pageSize).ToList();

            _logger.LogInformation(" > getLogsForUserPaginated - method finished.");
            return result;
        }

        public string addLog(string type, string severity, DateTime dateOfLog, string message)
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return null;

            _logger.LogInformation(" > addLog - method entered. userId on session = {}", HttpContext.Session.GetInt32("userId"));

            // get the userId from the session
            int userId = (int)HttpContext.Session.GetInt32("userId");

            var log = new Log { type = type, severity = severity, dateOfLog = dateOfLog, userId = userId, message = message };
            _context.Log.Add(log);
            _context.SaveChanges();

            _logger.LogInformation(" > addLog - method finished.");
            return "addLog: success";
        }

        public Log getLogById(int logId)
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return null;

            var log = _context.Log.Single(l => l.logId == logId);
            return log;
        }

        public ActionResult updateLog(int logId, string type, string severity, DateTime dateOfLog, string message)
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return null;

            _logger.LogInformation(" > updateLog - method entered. userId on session = {}", HttpContext.Session.GetInt32("userId"));

            // get user id from session and check if it is the same as userId from log
            int userId = (int)HttpContext.Session.GetInt32("userId");
            var updatedLog = getLogById(logId);

            if(userId != updatedLog.userId)
                return BadRequest("You cannot update this log!");

            updatedLog.type = type;
            updatedLog.severity = severity;
            updatedLog.dateOfLog = dateOfLog;
            updatedLog.message = message;

            _context.SaveChanges();

            _logger.LogInformation(" > updateLog - method finished.");
            return Ok("updateLog: success");
        }

        public ActionResult deleteLog(int logId)
        {
            if (HttpContext.Session.GetInt32("userId") == null)
                return null;

            _logger.LogInformation(" > deleteLog - method entered. userId on session = {}", HttpContext.Session.GetInt32("userId"));

            // get user id from session and check if it is the same as userId from log
            int userId = (int)HttpContext.Session.GetInt32("userId");
            var deletedLog = getLogById(logId);

            if (userId != deletedLog.userId)
                return BadRequest("You cannot delete this log!");

            _context.Log.Remove(deletedLog);
            _context.SaveChanges();

            _logger.LogInformation(" > deleteLog - method finished.");
            return Ok("deleteLog: success");
        }
    }
}
