import { useState } from "react";

function Catalog() {

const [active, setActive] = useState("ALL");

const products = [

{ title:"Premium Notebook", category:"NOTEBOOKS" },
{ title:"Hardbound Register", category:"NOTEBOOKS" },

{ title:"Luxury Pen Set", category:"PENS" },
{ title:"Metal Signature Pen", category:"PENS" },

{ title:"A4 Copier Paper", category:"A4" },
{ title:"A4 Premium Sheets", category:"A4" },

{ title:"Spiral Notebook Blue", category:"SPIRAL" },
{ title:"Spiral Executive Book", category:"SPIRAL" },

{ title:"Desk File Folder", category:"OFFICE" },
{ title:"Office Organizer", category:"OFFICE" },

{ title:"Executive Diary", category:"EXECUTIVE" },
{ title:"Leather Planner", category:"EXECUTIVE" },

];

const filters = [
"ALL",
"NOTEBOOKS",
"PENS",
"A4",
"SPIRAL",
"OFFICE",
"EXECUTIVE"
];

const filteredProducts =
active === "ALL"
? products
: products.filter((item) => item.category === active);

return (

<section className="catalog-page">

<p className="mini">WHOLESALE CATALOGUE • 2026</p>

<h1>
The <span>complete</span><br />
collection.
</h1>

<div className="filters">

{filters.map((item,index)=>(

<button
key={index}
className={active === item ? "active-filter" : ""}
onClick={() => setActive(item)}
>
{item}
</button>

))}

</div>

<div className="catalog-grid">

{filteredProducts.map((item,index)=>(

<div className="product-card" key={index}>

<div className="product-image"></div>

<h3>{item.title}</h3>

<p>{item.category}</p>

<h4>$XXXX</h4>

</div>

))}

</div>

</section>
);
}

export default Catalog;