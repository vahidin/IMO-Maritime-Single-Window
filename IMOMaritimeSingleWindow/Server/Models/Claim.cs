﻿using System;
using System.Collections.Generic;

namespace IMOMaritimeSingleWindow.Models
{
    public partial class Claim
    {
        public Claim()
        {
            RoleClaim = new HashSet<RoleClaim>();
        }

        public int ClaimId { get; set; }
        public string ClaimName { get; set; }
        public string SystemName { get; set; }

        public ICollection<RoleClaim> RoleClaim { get; set; }
    }
}
