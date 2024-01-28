import React, {useEffect} from 'react';
import $ from 'jquery'; 
import 'datatables.net'; 
import 'datatables.net-dt/css/jquery.dataTables.css';
import { RootState } from '../Redux/Combine';
import { useSelector } from 'react-redux'


const DataTable = () => {
const Data = useSelector((state: RootState) => state.Data.Data);

  useEffect(() => {
    const dataTable = $("#data-table").DataTable();
    dataTable.clear();
    Data?.forEach((item, index) => {
      dataTable.row.add([
        index + 1,
        item.name,
        item.sex,
        item.dob,
        item.mobile,
        item.govType,
        item.govId,
        item.address,
        item.country,
        item.state,
        item.city,
        item.pin,
      ]);
    });
    dataTable.draw();
  }, [Data]);

  useEffect(() => {
    const dataTable = $('#data-table').DataTable();
    if ($('#data-table').length) {
      dataTable.destroy();
    }
    $('#data-table').DataTable({
      paging: true,
      pageLength: 10,
    });
  }, [Data]);

  return (
    <section>
    <div className='head'>
    <h1>DATATABLE</h1>
    </div>
    <div className="datatable-container">
      {Data?.length > 0 ?(
        <>
    <table id='data-table' className="table">
    <thead>
    <tr>
    <th scope='col'>#</th>
    <th scope='col'>Name</th>
    <th scope='col'>Sex</th>
    <th scope='col'>Date of Birth/Age</th>
    <th scope='col'>Mobile Number</th>
    <th scope='col'>Govt Issued ID</th>
    <th scope='col'>Govt ID</th>
    <th scope='col'>Address</th>
    <th scope='col'>Country</th>
    <th scope='col'>State</th>
    <th scope='col'>City</th>
    <th scope='col'>Pincode</th>
    </tr>
  </thead>
  <tbody className="table-group-divider"></tbody>
        </table>
       </>
       ):(
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center"}}>
        <p>No data available</p>
    </div> 
      )}
    </div>
    </section>
  );
};

export default DataTable;
