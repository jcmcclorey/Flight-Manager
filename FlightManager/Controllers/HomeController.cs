using FlightManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FlightManager.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var airports = Persistence.GetAirports();
            return View(airports);
        }

        //gets data from .ajax post in script and creates a new customer
        public JsonResult Save(string FirstName, string LastName, string Address, 
            string City, string Country, string Zip, string Phone, string CurrentCountry, string CurrentCity, 
            string CurrentAirport, string DestinationCountry, string DestinationCity, string DestinationAirport,
            decimal Distance, decimal Cost, string State = "", string CurrentState = "", string DestinationState = "")
        {
            Customer customer = new Customer();
            customer.FirstName = FirstName;
            customer.LastName = LastName;
            customer.Address = Address;
            customer.City = City;
            customer.Country = Country;
            customer.Zip = Zip;
            customer.Phone = Phone;
            customer.CurrentCountry = CurrentCountry;
            customer.CurrentCity = CurrentCity;
            customer.CurrentAirport = CurrentAirport;
            customer.DestinationCountry = DestinationCountry;
            customer.DestinationCity = DestinationCity;
            customer.DestinationAirport = DestinationAirport;
            customer.Distance = Distance;
            customer.Cost = Cost;

            if (State != "")
                customer.State = State;
            if (CurrentState != "")
                customer.CurrentState = CurrentState;
            if (DestinationState != "")
                customer.DestinationState = DestinationState;

            Persistence.SaveCustomer(customer);
            //not sure what this does
            bool result = true;
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Success()
        {
            return View();
        }
    }
}