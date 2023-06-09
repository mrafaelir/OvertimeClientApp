$(document).ready(function () {
    $('#department-table').DataTable({
        ajax: {
            url: 'api/department',
            dataSrc: ''
        },
        columns: [{
                data: 'id'
            },
            {
                data: 'name'
            },
            {
                data: 'manager.name'
            },
            {
                data: 'hr.name'
            },
            {
                "data": null,
                render: function (data, row, type, meta) {
                    return `
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#update-department"
                        onclick="beforeUpdate(${data.id})">
                        <i class="bi bi-pencil-square"></i>
                    </button>

                    <button type="button" class="btn btn-danger"
                        onclick="departmentDelete(${data.id})">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                    
                    `;
                }
            }

        ]
    });

    $.ajax({
        method: "GET",
        url: "api/employee",
        dataType: "JSON",
        success: function (result) {
            $.each(result, function (key, value) {
                $('.department-in-manager').append(
                    '<option value="'
                    + value.id
                    + '">'
                    + value.name
                    + '</option>'
                ), 
                $('.department-in-hr').append(
                    '<option value="'
                    + value.id
                    + '">'
                    + value.name
                    + '</option>'
                ), 
                $('.department-up-manager').append(
                    '<option value="'
                    + value.id
                    + '">'
                    + value.name
                    + '</option>'
                ), 
                $('.department-up-hr').append(
                    '<option value="'
                    + value.id
                    + '">'
                    + value.name
                    + '</option>'
                )
            })
        }
    })
});

function create() {
    let valName = $('#department-in-name').val();
    let valManager = $('.department-in-manager').val();
    let valHr = $('.department-in-hr').val();
    $.ajax({
        method: "POST",
        url: "api/department",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            name: valName,
            manager_id: valManager,
            hr_id: valHr
        }),
        contentType: "application/json",
        success: result => {
            console.log(result)
            $('#create-department').modal('hide')
            $('#department-table').DataTable().ajax.reload()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully to insert',
                showConfirmButton: false,
                timer: 2000
            })
        },
        error: (result) => {
            console.log(result)
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: 'Please check the input fields, make sure nothing is empty!'
              })
        }
    })

}

function beforeUpdate(id) {
    $.ajax({
        method: "GET",
        url: "api/department/" + id,
        dataType: "JSON",
        success: function (result) {
            $('#department-up-id').val(`${result.id}`)
            $('#department-up-name').val(`${result.name}`)
            $('.department-up-manager').val(`${result.manager.id}`)
            $('.department-up-hr').val(`${result.hr.id}`)
        }
    })
}

function update() {
    let valId = $('#department-up-id').val()
    let valName = $('#department-up-name').val()
    let valManager = $('.department-up-manager').val()
    let valHr = $('.department-up-hr').val()

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to change this department!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "PUT",
                url: "api/department/" + valId,
                dataType: "JSON",
                beforeSend: addCsrfToken(),
                contentType: "application/json",
                data: JSON.stringify({
                    name: valName,
                    manager: {
                        id: valManager
                    },
                    hr: {
                        id: valHr
                    }
                }),
                success: result => {
                    $('#update-department').modal('hide')
                    $('#department-table').DataTable().ajax.reload()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully to update',
                        showConfirmButton: false,
                        timer: 2000
                    })
                },
                error: (result) => {
                    console.log(result)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... Something went wrong!',
                        text: 'Please check the input fields, make sure nothing is empty!'
                      })
                }
            })
        }
    })
}

function departmentDelete(id) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be delete this department!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "DELETE",
                url: "api/department/" + id,
                dataType: "JSON",
                beforeSend: addCsrfToken(),
                success: result => {
                    $('#department-table').DataTable().ajax.reload()
                    Swal.fire({
                        title: 'Successfully to Delete',
                        width: 600,
                        padding: '3em',
                        color: '#716add',
                        background: '#fff',
                        backdrop: `
                            rgba(0,0,123,0.4)
                            url("https://media.tenor.com/3ksij76-6M4AAAAC/sarahs-scribbles-throw.gif")
                            left top
                            no-repeat
                        `,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 5000
                    })
                }
            })
        }
    })

}
