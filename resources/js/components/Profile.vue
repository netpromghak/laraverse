<template>
    <div class="container">
        <div class="row justify-content-center mt-4">
            <div class="col-md-12">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background-image:url('./img/cover.jpg'); background-size: cover; background-position: center center;">
                        <h3 class="widget-user-username">Elizabeth Pierce</h3>
                        <h5 class="widget-user-desc">Backend Developer</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getUserPhoto()" alt="User Profile">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                          <div class="col-sm-4 border-right">
                              <div class="description-block">
                              <h5 class="description-header">3,200</h5>
                              <span class="description-text">SALES</span>
                              </div>
                              <!-- /.description-block -->
                          </div>
                          <!-- /.col -->
                          <div class="col-sm-4 border-right">
                              <div class="description-block">
                              <h5 class="description-header">13,000</h5>
                              <span class="description-text">FOLLOWERS</span>
                              </div>
                              <!-- /.description-block -->
                          </div>
                          <!-- /.col -->
                          <div class="col-sm-4">
                              <div class="description-block">
                              <h5 class="description-header">35</h5>
                              <span class="description-text">PRODUCTS</span>
                              </div>
                              <!-- /.description-block -->
                          </div>
                          <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
          <div class="col-md-3">

            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle" :src="getUserPhoto()" alt="User profile picture">
                </div>

                <h3 class="profile-username text-center">{{ form.name }}</h3>

                <p class="text-muted text-center">{{ form.type }}</p>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Followers</b> <a class="float-right">1,322</a>
                  </li>
                  <li class="list-group-item">
                    <b>Following</b> <a class="float-right">543</a>
                  </li>
                  <li class="list-group-item">
                    <b>Friends</b> <a class="float-right">13,287</a>
                  </li>
                </ul>

                <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- About Me Box -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">About Me</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <strong><i class="fa fa-book mr-1"></i> Education</strong>

                <p class="text-muted">
                  B.S. in Computer Science from the University of Tennessee at Knoxville
                </p>

                <hr>

                <strong><i class="fa fa-map-marker mr-1"></i> Location</strong>

                <p class="text-muted">Malibu, California</p>

                <hr>

                <strong><i class="fa fa-pencil mr-1"></i> Skills</strong>

                <p class="text-muted">
                  <span class="tag tag-danger">UI Design</span>
                  <span class="tag tag-success">Coding</span>
                  <span class="tag tag-info">Javascript</span>
                  <span class="tag tag-warning">PHP</span>
                  <span class="tag tag-primary">Node.js</span>
                </p>

                <hr>

                <strong><i class="fa fa-file-text-o mr-1"></i> Notes</strong>

                <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <!-- /.tab-pane -->
                  <div class="tab-pane active show" id="settings">
                    <form class="form-horizontal">
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
                        <label>Select User Role</label>
                        <select  v-model="form.type" name="type" id="type"
                        placeholder="Select User Role"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                            <!-- <option value="">Select User Role</option> -->
                            <option value="admin">Admin</option>
                            <option value="user">Standard User</option>
                            <option value="author">Author</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                    </div>
                    <!-- Password -->
                    <div class="form-group">
                        <label>Password : Leave if you dont want to change otherwise you have to fill</label>
                        <input v-model="form.password" type="password" name="password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>
                      <div class="form-group">
                        <label for="photo" class="col-sm-2 control-label">Photo</label>

                        <div class="col-sm-10">
                          <!-- <input type="image" class="form-control" id="photo" placeholder="Photo"> -->
                          <input type="file" @change="updatePhoto" class="form-control-file" id="photo">
                        </div>
                      </div>
                      <div class="form-group">
                          
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" @click.prevent="updateProfileInfo" class="btn btn-primary">Update</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
          <!-- /.col -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
          updatePhoto(e) {
            let file = e.target.files[0]
            // console.log(file)
            let reader = new FileReader()
            if(file['size'] < 2111775) {
              
              reader.onloadend = (file) => {
                // console.log('RESULT', reader.result)
                this.form.photo = reader.result
              }
              reader.readAsDataURL(file)
            }else {
              swal({
                type: 'error',
                title: 'Oops',
                text: '2MB is the max file size',
              })
            }
          },
          updateProfileInfo() {
            this.$Progress.start()
            this.form.put('api/profile')
              .then( () => {
                this.$Progress.finish()
              })
              .catch( () => {
                this.$Progress.fail()
              })
          },
          getUserPhoto() {
            let photoUrl = (this.form.photo.length > 200) ? this.form.photo : 'img/profile/'+this.form.photo
            return photoUrl
          }
        },
        created() {
            axios.get('api/profile')
                    .then(({ data }) => (this.form.fill(data) ))
        }
    }
</script>
