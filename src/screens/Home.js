import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
        //console.log(response[0],response[1]);

    }

    useEffect(() => {
        loadData()
    }, [])




    return (
        <div>
            <div><Navbar /> </div>
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                           { /*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
                        </div>
                        <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className='container overflow=hidden'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3 g-1'>
                                <div key={data._id} className="fs-3 m-3">
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem !== []
                                    ?
                                    foodItem.filter((item) =>( item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                        
                                                    ></Card>
                                                </div>
                                            )
                                        }
                                        ) : <div> No such Data Found</div>}
                            </div>
                            )
                        })
                        : ""
                }

            </div>


            <div> <Footer /> </div>


        </div>
    )
}

/*import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setFoodItem(data[0]);
            setFoodCat(data[1]);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{zIndex:"10"}}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/> 
              /*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/
           /* </form>
            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item active" >
            <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
            </div>
            <div className='container'>
                {foodCat.map((category) => (
                    <div className='row mb-3' key={category._id}>
                        <div className="fs-3 m-3">{category.CategoryName}</div>
                        <hr />
                        {foodItem.filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                            .map(filterItems => (
                                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                    <Card foodName={filterItems.name} options={filterItems.options[0]} imgSrc={filterItems.img} />
                                </div>
                            ))}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}*/


