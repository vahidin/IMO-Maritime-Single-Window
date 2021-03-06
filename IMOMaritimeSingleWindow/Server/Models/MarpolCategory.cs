﻿using System;
using System.Collections.Generic;

namespace IMOMaritimeSingleWindow.Models
{
    public partial class MarpolCategory
    {
        public MarpolCategory()
        {
            Dpg = new HashSet<Dpg>();
        }

        public int MarpolCategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<Dpg> Dpg { get; set; }
    }
}
