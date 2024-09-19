<template>
  <q-page class="q-px-md q-py-sm">
    <PageHeader
      icon="people"
      title="Users"
      color="secondary"
      description="System Administration"
    >
      <q-btn
        icon="add"
        flat
        title="Add new"
        class="q-mr-md"
        @click="create"
      />

      <q-input
        v-model="filter"
        label="Search"
        dense
        filled
        debounce="300"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </PageHeader>

    <q-table
      v-if="!loading"
      :columns="columns"
      :filter="filter"
      :rows="items"
      row-key="id"
    >
      <template #body-cell-manage="props">
        <q-td
          :props="props"
          class="q-gutter-x-sm"
        >
          <q-btn
            icon="edit"
            color="primary"
            size="sm"
            padding="xs"
            title="Edit the user"
            @click="edit(props.row)"
          />

          <q-btn
            icon="delete"
            color="negative"
            size="sm"
            padding="xs"
            title="Remove user"
            @click="showConfirm(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog
      v-model="showDialog"
      persistent
    >
      <CardForm
        :is-update="isUpdate"
        title="User"
        @on-create="store()"
        @on-update="update()"
      >
        <q-input
          v-model="user.name"
          label="Name"
          :error-message="msg('name')"
          :error="hasError('name')"
        />

        <q-input
          v-model="user.email"
          label="E-mail"
          type="email"
          :error-message="msg('email')"
          :error="hasError('email')"
        />

        <q-input
          v-model="user.password"
          label="Password"
          type="password"
          :error-message="msg('password')"
          :error="hasError('password')"
        />

        <q-select
          v-model="user.profile"
          label="Profile"
          :options="profiles"
          :error-message="msg('profile')"
          :error="hasError('profile')"
          emit-value
        />
      </CardForm>
    </q-dialog>

    <q-dialog
      v-model="confirmDialog"
      persistent
    >
      <card-confirm @on-confirm="destroy()" />
    </q-dialog>

    <q-inner-loading
      :showing="loading"
      label="Please wait..."
    />
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PageHeader, CardForm, CardConfirm } from 'src/components'
import { useNotify } from 'src/composables'
import { api } from 'src/boot/axios'

const { danger, success } = useNotify()

const loading = ref(false)
const users = ref([])
const showDialog = ref(false)
const confirmDialog = ref(false)
const profiles = ref(['Administrator', 'Collaborator'])
const defaultUser = { id: null, name: null, email: null, password: null, profile: 'Collaborator' }
const user = ref(null)
const isUpdate = ref(false)
const defaultErrors = ref({ name: null, email: null, password: null, profile: null })
const errors = ref(null)
const searchResult = ref([])
const searchString = ref([])
const filter = ref('')

const columns = ref([
  { name: 'id', required: true, label: 'ID', align: 'left', sortable: true, field: row => row.id },
  { name: 'name', required: true, label: 'NAME', align: 'left', sortable: true, field: row => row.name },
  { name: 'email', required: true, label: 'E-MAIL', align: 'left', sortable: true, field: row => row.email },
  { name: 'profile', required: false, label: 'PROFILE', align: 'left', sortable: true, field: row => row.profile },
  { name: 'manage', label: 'MANAGE', align: 'center' }
])

list()

const items = computed(() => {
  return searchString.value.length === 0 ? users.value : searchResult.value
})

/**
 * List all users
 */
async function list () {
  try {
    loading.value = true
    const response = await api.get('users')
    users.value = response.data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

/**
 * Stores a new user record
 */
async function store () {
  try {
    await api.post('users', user.value)
    onSuccess('User successfully created')
  } catch (error) {
    onError(error)
  } finally {
    loading.value = false
  }
}

/**
 * Update an existent user record
 */
async function update () {
  try {
    await api.patch(`users/${user.value.id}`, user.value)
    onSuccess('User successfully updated')
  } catch (error) {
    onError(error)
  } finally {
    loading.value = false
  }
}

/**
 * Delete an user record
 * @param {number} id
 */
async function destroy () {
  try {
    await api.delete(`users/${user.value.id}`)
    list()
    success('User successfully deleted')
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return danger(error.response.data.message)
    }
    console.log(error)
    danger('Error on connect to database')
  } finally {
    showDialog.value = false
    confirmDialog.value = false
  }
}

/**
 * Show the form to insert a new user
 */
function create () {
  isUpdate.value = false
  user.value = defaultUser
  errors.value = defaultErrors.value
  showDialog.value = true
}

/**
 * Show the for to edit an existent user
 * @param {number} id
 */
function edit (userToEdit) {
  isUpdate.value = true
  errors.value = defaultErrors.value
  user.value = userToEdit
  showDialog.value = true
}

/**
 * Called on update or create success
 * @param {string} msg
 */
function onSuccess (msg) {
  showDialog.value = false
  list()
  success(msg)
  loading.value = false
}

/**
 * Called on update or create fails
 * @param {object} error
 */
function onError (error) {
  if (error.response && error.response.status === 422) {
    errors.value = error.response.data.errors
    return
  }
  console.log(error)
  danger('Error on connect to database')
  loading.value = false
}

/**
 * Return validation erros messages
 * @param {string} field
 */
function msg (field) {
  if (!errors.value[field]) return ''
  return errors.value[field][0]
}

/**
 * Check is a field has validation erros messages
 * @param {string} field
 */
function hasError (field) {
  if (!errors.value[field]) return false
  return true
}

/**
 * User id
 * @param {object} id
 */
function showConfirm (userToDelete) {
  confirmDialog.value = true
  user.value = userToDelete
}
</script>
