


const TableComponent=({data})=>{
return(
<table>
 <tr>
    <th>Title</th>
    <th>Price</th>
  </tr>
{data.map((key,index)=>{

return(<>
<tr>
    <td>{key.title}</td>
    <td>{key.price}</td>
  </tr></>)


})
}
</table>
)
}
export default TableComponent;