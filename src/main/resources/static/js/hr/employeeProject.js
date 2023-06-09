$(document).ready(function () {
    $('#employeeproject-table').DataTable({
        ajax: {
            url: 'api/employeeproject',
            dataSrc: ''
        },
        columns: [{
                data: 'id'
            },
            {
                data: 'employee.name'
            },
            {
                data: 'project.name'
            }

        ]
    });

    $.ajax({
        method: "GET",
        url: "api/employee",
        dataType: "JSON",
        success: function (result) {
            // $('#employeeproject-in-employee').append(
            //     '<option value="">Choose Your employee</option>'
            // );
            $.each(result, function (key, value) {
                $('.employeeproject-in-employee').append(
                    '<option value="'
                    + value.id
                    + '">'
                    + value.name
                    + '</option>'
                )
            })
        }
    })

    $.ajax({
        method: "GET",
        url: "api/project",
        dataType: "JSON",
        success: function (result) {
            // $('#employeeproject-in-project').append(
            //     '<option value="">Choose Your project</option>'
            // );
            $.each(result, function (key, value) {
                $('.employeeproject-in-project').append(
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

function detail(id) {
    $.ajax({
        method: "GET",
        url: "api/employeeproject/" + id,
        dataType: "JSON",
        success: function (result) {
            $('#employeeproject-det-id').val(`${result.id}`)
            $('#employeeproject-det-employee').val(`${result.employee.name}`)
            $('#employeeproject-det-project').val(`${result.project.name}`)
        }
    })
}

function create() {
    let valEmployee = $('.employeeproject-in-employee').val();
    let valProject = $('.employeeproject-in-project').val();
    $.ajax({
        method: "POST",
        url: "api/employeeproject",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            employee: {
                id: valEmployee
            },
            project: {
                id: valProject
            }
        }),
        contentType: "application/json",
        success: result => {
            console.log(result)
            $('#create-employeeproject').modal('hide')
            $('#employeeproject-table').DataTable().ajax.reload()
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
        url: "api/employeeproject/" + id,
        dataType: "JSON",
        success: function (result) {
            $('#employeeproject-up-id').val(`${result.id}`)
            $('.employeeproject-in-employee').val(`${result.employee.id}`)
            $('.employeeproject-in-project').val(`${result.project.id}`)
        }
    })
}

function update() {
    let valId = $('#employeeproject-up-id').val()
    let valEmployee = $('.employeeproject-up-employee').val()
    let valProject = $('.employeeproject-up-project').val()

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to change this employeeproject!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "PUT",
                url: "api/employeeproject/" + valId,
                dataType: "JSON",
                beforeSend: addCsrfToken(),
                contentType: "application/json",
                data: JSON.stringify({
                    employee: {
                        id: valEmployee
                    },
                    project: {
                        id: valProject
                    }
                }),
                success: result => {
                    $('#update-employeeproject').modal('hide')
                    $('#employeeproject-table').DataTable().ajax.reload()
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

function employeeprojectDelete(id) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be delete this employeeproject!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "DELETE",
                url: "api/employeeproject/" + id,
                dataType: "JSON",
                beforeSend: addCsrfToken(),
                success: result => {
                    $('#employeeproject-table').DataTable().ajax.reload()
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
