using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlightManager.Models
{
    public class Persistence
    {
        public static List<Airport> GetAirports()
        {
            AirportManagerEntities db = new AirportManagerEntities();
            var dbAirports = db.Airports.ToList();
            return dbAirports;
        }

        public static List<Customer> GetCustomers()
        {
            AirportManagerEntities db = new AirportManagerEntities();
            var dbCustomers = db.Customers.ToList();
            return dbCustomers;
        }

        public static void SaveCustomer(Customer customer)
        {
            AirportManagerEntities db = new AirportManagerEntities();
            db.Customers.Add(customer);
            db.SaveChanges();
        }
    }
}