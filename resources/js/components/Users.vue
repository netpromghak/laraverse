<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users List</h3>

                <div class="card-tools">
                  <button class="btn btn-success" data-toggle="modal" data-target="#addNew" @click="popNewUserModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Registered Time</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name}}</td>
                            <td>{{ user.email}}</td>
                            <td>{{ user.type | capText }}</td>
                            <td>{{ user.created_at | prettyDate }}</td>
                            <td>                      
                                <a href="#" class="orange" @click="popEditUserModal(user)">
                                    <i class="fas fa-edit"></i>
                                </a> /
                                <a href="#" class="red" @click="deleteUser(user.id)">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 v-show="!editMode" class="modal-title" id="addNewLabel">Fill User Information <i class="fas fa-user"></i></h5>
                <h5 v-show="editMode" class="modal-title" id="addNewLabel">Edit User Information <i class="fas fa-edit"></i></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent="editMode ? updateUser() : createUser()">
                <div class="modal-body">
                    <!-- Username -->
                    <div class="form-group">
                        <label for="name">Information</label>
                        <input v-model="form.name" type="text" name="name"
                        placeholder="Name" id="name"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                        <has-error :form="form" field="name"></has-error>
                    </div>
                    <!-- Email -->
                    <div class="form-group">
                        <input v-model="form.email" type="email" name="email"
                        placeholder="Email Address"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                        <has-error :form="form" field="email"></has-error>
                    </div>
                    <!-- Bio -->
                    <div class="form-group">
                        <textarea v-model="form.bio" name="bio" id="bio"
                        placeholder="Bio (Optional)"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                        </textarea>
                        <has-error :form="form" field="bio"></has-error>
                    </div>
                    <!-- User Type -->
                    <div class="form-group">
                        <select  v-model="form.type" name="type" id="type"
                        placeholder="Name"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Standard User</option>
                            <option value="author">Author</option>
                        </select>
                        <has-error :form="form" field="name"></has-error>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="form.password" type="password" name="password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button v-show="editMode" type="submit" class="btn btn-success">Update</button>
                    <button v-show="!editMode" type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                editMode: false,
                users: {},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods: {
            getUsers() {
                axios.get('api/user')
                    .then(({ data }) => (this.users = data.data ))
            },
            createUser() {
                this.$Progress.start()
                this.form.post('api/user')
                    .then( () => {
                        Shoot.$emit('loadUsers')
                        $('#addNew').modal('hide')
                        toast({
                            type: 'success',
                            title: 'New User Created Successfully'
                        })
                        this.$Progress.finish()
                    })
                    .catch(() => {
                        this.$Progress.fail()
                    })
               
            },
            updateUser(){
                this.$Progress.start()
                this.form.put('api/user/'+this.form.id)
                    .then( () => {
                        this.$Progress.finish()
                        $('#addNew').modal('hide')
                        toast({
                            type: 'success',
                            title: 'User Info Updated Successfully'
                        })
                        Shoot.$emit('loadUsers')
                    })
                    .catch( () => {
                        this.$Progress.fail()
                    })
                
            },
            deleteUser(user_id) {
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {

                    // Send Ajax Request to Delete
                    this.form.delete('api/user/'+user_id).then( () => {

                        if (result.value) {
                            swal(
                            'Deleted!',
                            'User have been deleted.',
                            'success'
                            )
                            Shoot.$emit('loadUsers')
                        }
                    }).catch( () => {
                        swal('Failed', 'Something went wrong!', 'warning')
                    })
                })
            },
            popNewUserModal() {
            this.editMode = false
            this.form.reset()
            $('#addNew').modal('show')
            },
            popEditUserModal(user) {
            this.editMode = true
            this.form.reset()
            $('#addNew').modal('show')
            this.form.fill(user)
            }
        },
        
        created() {
            this.getUsers()
            Shoot.$on('loadUsers', () => {
                this.getUsers()
            })
        }
    }
</script>
