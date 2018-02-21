﻿using System;
using System.Collections.Generic;

namespace IMOMaritimeSingleWindow.Models
{
    public partial class Location
    {
        public Location()
        {
            Department = new HashSet<Department>();
            InverseLocationInLocation = new HashSet<Location>();
            PortCallArrivalLocation = new HashSet<PortCall>();
            PortCallDepartureLocation = new HashSet<PortCall>();
        }

        public int LocationId { get; set; }
        public int? LocationInLocationId { get; set; }
        public int CountryId { get; set; }
        public int LocationTypeId { get; set; }
        public int LocationSourceId { get; set; }
        public int CouncilId { get; set; }
        public string LocationCode { get; set; }
        public int? LocationNo { get; set; }
        public string PostCode { get; set; }
        public string LocationName { get; set; }

        public Council Council { get; set; }
        public Country Country { get; set; }
        public Location LocationInLocation { get; set; }
        public LocationSource LocationSource { get; set; }
        public LocationType LocationType { get; set; }
        public ICollection<Department> Department { get; set; }
        public ICollection<Location> InverseLocationInLocation { get; set; }
        public ICollection<PortCall> PortCallArrivalLocation { get; set; }
        public ICollection<PortCall> PortCallDepartureLocation { get; set; }
    }
}
