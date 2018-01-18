/// <reference path="jquery-3.2.1.min.js" />
/// <reference path="knockout-3.4.2.js" />

//grab the data from the razor page model
var data = model;

//these are prefaced with "Get" to avoid confusion
//defines a city
function GetCity(name)
{
    this.cityName = name;
};

//defines a country
function GetCountry(name)
{
    this.countryName = name;
};

//defines an airport
function GetAirport(name)
{
    this.airportName = name;
};

//defines a state
function GetState(name)
{
    this.stateName = name;
};

//changes latitude/longitude degrees to radians
function deg2rad(deg)
{
    return deg * (Math.PI / 180)
}

//defines ko.observables to bind
var ViewModel =
{
    availableCities: ko.observableArray(),
    selectedCity: ko.observable(),
    availableCountries: ko.observableArray(),
    selectedCountry: ko.observable(),
    availableAirports: ko.observableArray(),
    selectedAirport: ko.observable(),
    availableCities2: ko.observableArray(),
    selectedCity2: ko.observable(),
    availableCountries2: ko.observableArray(),
    selectedCountry2: ko.observable(),
    availableAirports2: ko.observableArray(),
    selectedAirport2: ko.observable(),
    availableStates: ko.observableArray(),
    availableStates2: ko.observableArray(),
    selectedState: ko.observable(),
    selectedState2: ko.observable(),
    billCountry: ko.observable(),
    billState: ko.observable(),
    billCity: ko.observable(),
    CustomerInfo: [],
    firstName: ko.observable(),
    lastName: ko.observable(),
    address: ko.observable(),
    zip: ko.observable(),
    phone: ko.observable()
};

//separates countries, cities, states and airports into separate arrays
//done twice
for (var i = 0; i < data.length; i++)
{
    ViewModel.availableCountries.push(new GetCountry(data[i].Country));
    ViewModel.availableCities.push(new GetCity(data[i].City));
    ViewModel.availableAirports.push(new GetAirport(data[i].Name));
    ViewModel.availableCountries2.push(new GetCountry(data[i].Country));
    ViewModel.availableCities2.push(new GetCity(data[i].City));
    ViewModel.availableAirports2.push(new GetAirport(data[i].Name));

    if (data[i].State != null)
    {
        ViewModel.availableStates.push(new GetState(data[i].State));
        ViewModel.availableStates2.push(new GetState(data[i].State));
    };
};

//FROM SECTION
//gets each city once
ViewModel.uniqueCities = ko.dependentObservable(function ()
{
    var seen = [];
    return ViewModel.availableCities().filter(function (n)
    {
        return seen.indexOf(n.cityName) == -1 && seen.push(n.cityName);
    });
});

//sorts uniqueCities alphabetically
ViewModel.sortedCities = ViewModel.uniqueCities().sort(function (left, right)
{
    return left.cityName == right.cityName ? 0 : (left.cityName < right.cityName ? -1 : 1)
});

//gets only cities in selectedCountry()
ViewModel.filteredCities = ko.computed(function ()
{
    var filter = ViewModel.selectedCountry();

    if (filter == "Choose one...")
    {
        return [];
    }
    else
    {
        var cities = ko.observableArray();
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].Country == filter)
            {
                cities.push(new GetCity(data[i].City));
            };
        };

        var unique = ko.dependentObservable(function ()
        {
            var seen = [];
            return cities().filter(function (n)
            {
                return seen.indexOf(n.cityName) == -1 && seen.push(n.cityName);
            });
        });

        sorted = unique().sort(function (left, right)
        {
            return left.cityName == right.cityName ? 0 : (left.cityName < right.cityName ? -1 : 1)
        });

        
        return sorted;
    };
});

//gets each country once
ViewModel.uniqueCountries = ko.dependentObservable(function ()
{
    var seen = [];
    return ViewModel.availableCountries().filter(function (n)
    {
        return seen.indexOf(n.countryName) == -1 && seen.push(n.countryName);
    });
});

//sorts uniqueCountries alphabetically
ViewModel.sortedCountries = ViewModel.uniqueCountries().sort(function (left, right)
    {
        return left.countryName == right.countryName ? 0 : (left.countryName < right.countryName ? -1 : 1)
});

//sorts airports alphabetically
ViewModel.sortedAirports = ViewModel.availableAirports().sort(function (left, right)
{
    return left.airportName == right.airportName ? 0 : (left.airportName < right.airportName ? -1 : 1)
});

//gets only airports in selectedCity()
ViewModel.filteredAirports = ko.computed(function ()
{
    var filter = ViewModel.selectedCountry();
    var filter2 = ViewModel.selectedCity();
    var filter3 = ViewModel.selectedState();

    if (filter == "Choose one...")
    {
        return [];
    }
    else
    {
        var airports = ko.observableArray();
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].Country == filter && data[i].City == filter2 && filter3 == data[i].State)
            {
                airports.push(new GetAirport(data[i].Name));
            };
        };

        var unique = ko.dependentObservable(function ()
        {
            var seen = [];
            return airports().filter(function (n)
            {
                return seen.indexOf(n.airportName) == -1 && seen.push(n.airportName);
            });
        });

        sorted = unique().sort(function (left, right)
        {
            return left.airportName == right.airportName ? 0 : (left.airportName < right.airportName ? -1 : 1)
        });


        return sorted;
    };
});

//gets each state once
ViewModel.uniqueStates = ko.dependentObservable(function ()
{
    var seen = [];
    return ViewModel.availableStates().filter(function (n)
    {
        return seen.indexOf(n.stateName) == -1 && seen.push(n.stateName);
    });
});

//sorts uniqueStates() alphabetically
ViewModel.sortedStates = ViewModel.uniqueStates().sort(function (left, right)
{
    return left.stateName == right.stateName ? 0 : (left.stateName < right.stateName ? -1 : 1)
});

//gets only states that have selectedCity()
ViewModel.filteredStates = ko.computed(function ()
{
    var filter = ViewModel.selectedCity();
    var filter2 = ViewModel.selectedCountry();
    if (filter == "Choose one..." || filter2 != "United States")
    {
        return [];
    }
    else
    {
        var states = ko.observableArray();
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].City == filter && data[i].Country == filter2)
            {
                states.push(new GetState(data[i].State));
            };
        };

        var unique = ko.dependentObservable(function ()
        {
            var seen = [];
            return states().filter(function (n)
            {
                return seen.indexOf(n.stateName) == -1 && seen.push(n.stateName);
            });
        });

        sorted = unique().sort(function (left, right)
        {
            return left.stateName == right.stateName ? 0 : (left.stateName < right.stateName ? -1 : 1)
        });

        return sorted;
    };
});


//DISTANCE & PRICE SECTION
//formula that calculates the distance on the earth in miles
//kilometers is commented out
ViewModel.distance = ko.computed(function ()
{
    var filter1 = ViewModel.selectedAirport();
    var filter2 = ViewModel.selectedAirport2();

    if (filter1 == "Choose one..." || filter2 == "Choose one..." || filter1 == null
        || filter2 == null || filter1 == "" || filter2 == "")
    {
        return 0;
    }
    else
    {
        a1Lat = ko.observable();
        a1Long = ko.observable();
        a2Lat = ko.observable();
        a2Long = ko.observable();

        for (var i = 0; i < data.length; i++)
        {
            if (data[i].Name == filter1)
            {
                a1Lat(data[i].latitude_deg);
                a1Long(data[i].longitude_deg);
            }
            else if (data[i].Name == filter2)
            {
                a2Lat(data[i].latitude_deg);
                a2Long(data[i].longitude_deg);
            }
            else
            {

            };
        };

        var dlon;
        var dlat;
        var a;
        var c;
        var mile;
        var miles = ko.observable();
       // var kilos = ko.observable();
        dlon = deg2rad(a2Long() - a1Long());
        dlat = deg2rad(a2Lat() - a1Lat());
        a = (Math.pow((Math.sin(dlat/2)) ,2)) + (Math.cos(deg2rad(a1Lat()))) * (Math.cos(deg2rad(a2Lat()))) * (Math.pow((Math.sin(dlon / 2)), 2));
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var radius;
        radius = 3961;
        mile = radius * c;
        miles(mile.toFixed(1));
       // kilo = 6373 * c;
       // kilos(kilo.toFixed(1));
        return miles();
    }; 
});

//calculates price (initial fee of $50 + 11 cents/mile)
ViewModel.price = ko.computed(function ()
{
    var filter1 = ViewModel.selectedAirport();
    var filter2 = ViewModel.selectedAirport2();

    if (filter1 == "Choose one..." || filter2 == "Choose one..." || filter1 == null
        || filter2 == null || filter1 == "" || filter2 == "")
    {
        return 0;
    }
    else
    {
        var fee = 50;
        var filter = ViewModel.distance();
        var cost = (filter * 11) / 100;
        return (fee + cost).toFixed(2);
    };
});

//show price only if it is greater than 0
ViewModel.showPrice = ko.computed(function ()
{
    var filter = ViewModel.price();
    if (filter == 0)
        return false;
    else
        return true;
});

//show distance only if it is greater than 0
ViewModel.showDistance = ko.computed(function ()
{
    var filter = ViewModel.distance();
    if (filter == 0)
        return false;
    else
        return true;
});


//TO SECTION
//get each city once except the city you are in
ViewModel.uniqueCities2 = ko.dependentObservable(function ()
{
    var seen = [];
    return ViewModel.availableCities2().filter(function (n)
    {
        return seen.indexOf(n.cityName) == -1 && seen.push(n.cityName);
    });
});

//sort uniqueCities2() alphabetically
ViewModel.sortedCities2 = ViewModel.uniqueCities2().sort(function (left, right)
{
    return left.cityName == right.cityName ? 0 : (left.cityName < right.cityName ? -1 : 1)
});

//get cities in selectedCountry2()
ViewModel.filteredCities2 = ko.computed(function ()
{
    var filter = ViewModel.selectedCountry2();
    var filter2 = ViewModel.selectedCity();

    if (filter == "Choose one...")
    {
        return [];
    }
    else
    {
        var cities = ko.observableArray();
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].Country == filter && data[i].City != filter2)
            {
                cities.push(new GetCity(data[i].City));
            };
        };

        var unique = ko.dependentObservable(function ()
        {
            var seen = [];
            return cities().filter(function (n)
            {
                return seen.indexOf(n.cityName) == -1 && seen.push(n.cityName);
            });
        });

        sorted = unique().sort(function (left, right)
        {
            return left.cityName == right.cityName ? 0 : (left.cityName < right.cityName ? -1 : 1)
        });


        return sorted;
    };
});

//get each country once
ViewModel.uniqueCountries2 = ko.dependentObservable(function ()
{
    var seen = [];
    return ViewModel.availableCountries2().filter(function (n)
    {
        return seen.indexOf(n.countryName) == -1 && seen.push(n.countryName);
    });
});

//sort uniqueCountries2() alphabetically
ViewModel.sortedCountries2 = ViewModel.uniqueCountries2().sort(function (left, right)
{
    return left.countryName == right.countryName ? 0 : (left.countryName < right.countryName ? -1 : 1)
});

//sort airports alphabetically
ViewModel.sortedAirports2 = ViewModel.availableAirports2().sort(function (left, right)
{
    return left.airportName == right.airportName ? 0 : (left.airportName < right.airportName ? -1 : 1)
});

//get airports that are in selectedCity2()
ViewModel.filteredAirports2 = ko.computed(function ()
{
    var filter = ViewModel.selectedCountry2();
    var filter2 = ViewModel.selectedCity2();
    var filter3 = ViewModel.selectedState2();

    if (filter == "Choose one...")
    {
        return [];
    }
    else
    {
        var airports = ko.observableArray();
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].Country == filter && data[i].City == filter2 && data[i].State == filter3)
            {
                airports.push(new GetAirport(data[i].Name));
            };
        };

        var unique = ko.dependentObservable(function ()
        {
            var seen = [];
            return airports().filter(function (n)
            {
                return seen.indexOf(n.airportName) == -1 && seen.push(n.airportName);
            });
        });

        sorted = unique().sort(function (left, right)
        {
            return left.airportName == right.airportName ? 0 : (left.airportName < right.airportName ? -1 : 1)
        });


        return sorted;
    };
});

//get each state once
ViewModel.uniqueStates2 = ko.dependentObservable(function ()
{
    var seen = [];
    return ViewModel.availableStates2().filter(function (n)
    {
        return seen.indexOf(n.stateName) == -1 && seen.push(n.stateName);
    });
});

//sort uniqueStates2() alphabetically
ViewModel.sortedStates2 = ViewModel.uniqueStates2().sort(function (left, right)
{
    return left.stateName == right.stateName ? 0 : (left.stateName < right.stateName ? -1 : 1)
});

//get only states that have selectedCity2()
ViewModel.filteredStates2 = ko.computed(function ()
{
    var filter = ViewModel.selectedCity2();
    var filter2 = ViewModel.selectedCountry2();
    var filter3 = ViewModel.selectedCity();
    if (filter == "Choose one..." || filter2 != "United States")
    {
        return [];
    }
    else
    {
        var states = ko.observableArray();
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].City == filter && data[i].City != filter3 && data[i].Country == filter2)
            {
                states.push(new GetState(data[i].State));
            };
        };

        var unique = ko.dependentObservable(function ()
        {
            var seen = [];
            return states().filter(function (n)
            {
                return seen.indexOf(n.stateName) == -1 && seen.push(n.stateName);
            });
        });

        sorted = unique().sort(function (left, right)
        {
            return left.stateName == right.stateName ? 0 : (left.stateName < right.stateName ? -1 : 1)
        });


        return sorted;
    };
});


//BILL SECTION
//allow bill-e to select a state if in US
ViewModel.billFilteredStates = ko.computed(function ()
{
    var filter = ViewModel.billCountry();
    if (filter == "Choose one..." || filter != "United States")
    {
        return [];
    }
    else
    {
        var states = ko.observableArray();
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].Country == filter)
            {
                states.push(new GetState(data[i].State));
            };
        };

        var unique = ko.dependentObservable(function ()
        {
            var seen = [];
            return states().filter(function (n)
            {
                return seen.indexOf(n.stateName) == -1 && seen.push(n.stateName);
            });
        });

        sorted = unique().sort(function (left, right)
        {
            return left.stateName == right.stateName ? 0 : (left.stateName < right.stateName ? -1 : 1)
        });


        return sorted;
    };
});


//VALIDATION SECTION
//check that all fields are filled
function CheckRequiredFields()
{
    if (ViewModel.selectedCountry() == "Choose one..." || ViewModel.selectedCountry() == null || ViewModel.selectedCountry() == "")
    {
        return false;
    }
    else if (ViewModel.selectedCity() == "Choose one..." || ViewModel.selectedCity() == null || ViewModel.selectedCity() == "")
    {
        return false;
    }
    else if ((ViewModel.selectedState() == "Choose one..." || ViewModel.selectedState() == null
        || ViewModel.selectedState() == "") && ViewModel.selectedCountry() == "United States")
    {
        return false;
    }
    else if (ViewModel.selectedAirport() == "Choose one..." || ViewModel.selectedAirport() == null || ViewModel.selectedAirport() == "")
    {
        return false;
    }
    else if (ViewModel.selectedCountry2() == "Choose one..." || ViewModel.selectedCountry2() == null || ViewModel.selectedCountry2() == "")
    {
        return false;
    }
    else if (ViewModel.selectedCity2() == "Choose one..." || ViewModel.selectedCity2() == null || ViewModel.selectedCity2() == "")
    {
        return false;
    }
    else if ((ViewModel.selectedState2() == "Choose one..." || ViewModel.selectedState2() == null
        || ViewModel.selectedState2() == "") && ViewModel.selectedCountry2() == "United States")
    {
        return false;
    }
    else if (ViewModel.selectedAirport2() == "Choose one..." || ViewModel.selectedAirport2() == null || ViewModel.selectedAirport2() == "")
    {
        return false;
    }
    else if (ViewModel.firstName() == null || ViewModel.firstName() == "")
    {
        return false;
    }
    else if (ViewModel.lastName() == null || ViewModel.lastName() == "")
    {
        return false;
    }
    else if (ViewModel.address() == null || ViewModel.address() == "")
    {
        return false;
    }
    else if (ViewModel.billCountry() == "Choose one..." || ViewModel.billCountry() == null || ViewModel.billCountry() == "")
    {
        return false;
    }
    else if (ViewModel.billCity() == null || ViewModel.billCity() == "")
    {
        return false;
    }
    else if ((ViewModel.billState() == "Choose one..." || ViewModel.billState() == null
        || ViewModel.billState() == "") && ViewModel.billCountry() == "United States")
    {
        return false;
    }
    else if (ViewModel.zip() == null || ViewModel.zip() == "")
    {
        return false;
    }
    else if (ViewModel.phone() == null || ViewModel.phone() == "")
    {
        return false;
    }
    else
    {
        return true;
    }
}

//if CheckRequiredFields == false return error message
function printError()
{
    if (ViewModel.selectedCountry() == "Choose one..." || ViewModel.selectedCountry() == null || ViewModel.selectedCountry() == "")
    {
        return "Please select your current country";
    }
    else if (ViewModel.selectedCity() == "Choose one..." || ViewModel.selectedCity() == null || ViewModel.selectedCity() == "")
    {
        return "Please select your current city";
    }
    else if ((ViewModel.selectedState() == "Choose one..." || ViewModel.selectedState() == null
        || ViewModel.selectedState() == "") && ViewModel.selectedCountry() == "United States")
    {
        return "Please select your current state";
    }
    else if (ViewModel.selectedAirport() == "Choose one..." || ViewModel.selectedAirport() == null || ViewModel.selectedAirport() == "")
    {
        return "Please select an airport";
    }
    else if (ViewModel.selectedCountry2() == "Choose one..." || ViewModel.selectedCountry2() == null || ViewModel.selectedCountry2() == "")
    {
        return "Please select your destination country";
    }
    else if (ViewModel.selectedCity2() == "Choose one..." || ViewModel.selectedCity2() == null || ViewModel.selectedCity2() == "")
    {
        return "Please select your destination city";
    }
    else if ((ViewModel.selectedState2() == "Choose one..." || ViewModel.selectedState2() == null
        || ViewModel.selectedState2() == "") && ViewModel.selectedCountry2() == "United States")
    {
        return "Please select your destination state";
    }
    else if (ViewModel.selectedAirport2() == "Choose one..." || ViewModel.selectedAirport2() == null || ViewModel.selectedAirport2() == "")
    {
        return "Please select an airport";
    }
    else if (ViewModel.firstName() == null || ViewModel.firstName() == "")
    {
        return "Please enter your first name";
    }
    else if (ViewModel.lastName() == null || ViewModel.lastName() == "")
    {
        return "Please enter your last name";
    }
    else if (ViewModel.address() == null || ViewModel.address() == "")
    {
        return "Please enter your address";
    }
    else if (ViewModel.billCountry() == "Choose one..." || ViewModel.billCountry() == null || ViewModel.billCountry() == "")
    {
        return "Please enter your country";
    }
    else if (ViewModel.billCity() == null || ViewModel.billCity() == "")
    {
        return "Please enter your city";
    }
    else if ((ViewModel.billState() == "Choose one..." || ViewModel.billState() == null
        || ViewModel.billState() == "") && ViewModel.billCountry() == "United States")
    {
        return "Please enter your state";
    }
    else if (ViewModel.zip() == null || ViewModel.zip() == "")
    {
        return "Please enter your zip code";
    }
    else if (ViewModel.phone() == null || ViewModel.phone() == "")
    {
        return "Please enter your phone number";
    }
    else
    {
        return "You forgot to enter some required information. Please check the form.";
    }
}


//bind ViewModel
ko.applyBindings(ViewModel);