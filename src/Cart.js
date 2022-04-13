/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import MaterialTable from 'material-table';
import html2canvas from 'html2canvas'
// import { Document, Page } from 'react-pdf';
import jsPDF from 'jspdf'
import { renderToString } from "react-dom/server";
import { useEffect } from 'react';
function Cart() {
    const food = JSON.parse(localStorage.getItem("shoping"))
    const [myArray, setMyArray] = useState(food);
    const [item, setItem] = useState(food);
    // const[count,setCount]=useState([])
    const print = () => {

        const divToDisplay = document.getElementById('div')
        html2canvas(divToDisplay,
            {
                useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
                onrendered: function (canvas) {
                    divToDisplay.appendChild(canvas);
                }
            }).then(function (canvas) {
                const divImage = canvas.toDataURL("image/jpeg");
                const pdf = new jsPDF();
                pdf.addImage(divImage, 'JPEG', 0, 0);
                pdf.save("download.pdf");
            })
    };
    const init = (items_id) => {
        setMyArray(myArray => myArray.map((item) => items_id === item._id ? { ...item, quantities: parseInt(item.quantities) + 1 } : item))
        // console.log("gfghh", myArray);
    }
    const init1 = (items_id) => {

        setMyArray(myArray => myArray.map((item) => items_id === item._id ? { ...item, quantities: item.quantities - 1 } : item))

    }
    const xyz = (index) => {
        setTimeout(() => {
            const list = [...item];
            list.splice(index, 1);
            setItem(list);
            console.log(list, "sbdj")
            window.location.reload(true)
            localStorage.setItem('shoping', JSON.stringify(list))
        }, 1000)
    }

    return (
        <div id='div'>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantities</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                {
                    myArray.map((items, i) => {
                        return (
                            <tbody>
                                <tr key={i}>
                                    <td>
                                        <img src={items.profile_url}  />
                                    </td>
                                    <td>
                                        {items.name}
                                    </td>
                                    <td>
                                        {items.description}
                                    </td>
                                    <td>
                                        {items.quantities}
                                    </td>
                                    <td>
                                        {items.price}
                                    </td>
                                    <td>
                                        <button onClick={() => init(items._id)}> + </button>
                                         <div>{items.quantities}</div> 
                                          <button onClick={() => init1(items._id)}>  - </button>
                                    </td>
                                    <td>
                                        <button onClick={() => xyz(i)}> Remove </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
                <button onClick={print}> Download</button>

        </div>
    )

}

export default Cart