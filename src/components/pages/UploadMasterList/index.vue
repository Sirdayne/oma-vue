<template>
  <div class="upload-master-list">
    <div v-if="spinner" class="spinner-container">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <template v-else>
      <process v-if="status === 'process'"></process>
      <template v-else>
        <notification v-if="error" type="error">
          <div v-html="error"></div>
        </notification>
        <div class="upload-master-list__title">
          <h4>
            {{ status === 'upload' ? 'Upload a new Master List' : 'Add to your Master List'}}
          </h4>
          <v-icon @click="$router.go(-1)">highlight_off</v-icon>
        </div>
        <div class="upload-master-list__step upload-master-list__step-1">
          <div>
            <h4>STEP 1</h4>
            <p>Download the template & format your data</p>
          </div>
          <div class="upload-master-list__step__button">
            <a href="static/template.csv" download>
              <v-btn color="primary" outlined>Download template</v-btn>
            </a>
          </div>
        </div>
        <div class="upload-master-list__hr"></div>
        <div class="upload-master-list__step  upload-master-list__step-2">
          <div style="padding-bottom: 23px;">
            <h4>STEP 2</h4>
            <p>Upload your formatted file</p>
            <div class="upload-master-list__step-2__hint">Maximum file size is 10MB with maximum 10k records</div>
          </div>
          <div class="upload-master-list-file" v-if="file">
            <div class="upload-master-list-file__name">{{ file.name }}</div>
            <div class="upload-master-list-file__remove" @click="removeFile">Remove</div>
          </div>
        </div>
        <div @drop.prevent="dropFile" @dragover.prevent class="upload-master-list__dnd">
          <div class="upload-master-list__dnd__container">
            <img src="../../../assets/images/graphic-upload.svg" class="upload-master-list__dnd__container__img" alt="Upload">
            <p class="upload-master-list__dnd__container__text">Drag and drop your .csv here</p>
            <label for="file-upload" class="custom-file-upload">
              Browse for file
            </label>
            <input id="file-upload" type="file" accept=".csv" @change="inputFile"/>
          </div>
        </div>
        <div class="upload-master-list__cancel">
          <div @click="$router.go(-1)" style="cursor: pointer;">Cancel</div>
        </div>
        <footer-block v-if="file" @click="fetchUploadFile">
          <div>
            Upload Master List
            <v-icon color="white">keyboard_arrow_right</v-icon>
          </div>
        </footer-block>
      </template>
    </template>
  </div>
</template>

<script>

import Process from './Process'
import FooterBlock from '@/components/partials/Footer'
import { errorHandler } from '@/plugins/CustomAPI'
import Notification from '@/components/partials/Notification'

export default {
  components: {
    Process,
    FooterBlock,
    Notification
  },
  data () {
    return {
      file: null,
      error: null,
      status: 'upload',
      spinner: true
    }
  },
  computed: {
    getOnboardingData () {
      return this.$store.getters.getOnboardingData
    }
  },
  created () {
    this.fetchFileStatus()
  },
  methods: {
    setStatus (status) {
      if (status.filePending === 'Y') {
        this.$router.push('/master-file-uploaded')
      } else if (status.fileUploaded === 'Y') {
        this.status = 'add'
      } else {
        this.status = 'upload'
      }
    },
    fetchFileStatus () {
      this.spinner = true
      this.$API.fileStatus({
        orgId: this.getOnboardingData.organization.id
      }).then(res => {
        this.setStatus(res)
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        errorHandler(err)
      })
    },
    validateTypeCSV (fileType) {
      const types = [
        'text/plain',
        'text/x-csv',
        'text/csv',
        'text/comma-separated-values',
        'text/x-comma-separated-values',
        'text/tab-separated-values',
        'application/vnd.ms-excel',
        'application/csv',
        'application/x-csv'
      ]
      return types.find(type => type === fileType)
    },
    inputFile (e) {
      if (e && e.target && e.target.files && e.target.files[0]) {
        this.file = e.target.files[0]
      }
    },
    dropFile (e) {
      if (e && e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer.files[0].name.slice(-4) === '.csv' && this.validateTypeCSV(e.dataTransfer.files[0].type)) {
        this.file = e.dataTransfer.files[0]
      }
    },
    removeFile () {
      this.file = null
    },
    errorHandlerUpload (err) {
      this.error = ''
      if (err) {
        if (err.message) {
          this.error += err.message
        }
        if (err.traceId) {
          this.error += err.traceId ? `<div class="trace-id">{Trace id: ${err.traceId}}</div>` : ''
        }
      }
    },
    fetchUploadFile () {
      this.spinner = true
      const orgId = this.getOnboardingData.organization.id
      const endpoint = `${process.env.SERVICE_URL}/p/maProxy/ma/organization/v1/${orgId}/upload`
      const formData = new FormData()
      formData.append('file', this.file)
      fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: formData
      }).then(res => {
        if (res.status === 200) {
          this.status = 'process'
        } else {
          res.json().then(res => {
            this.errorHandlerUpload(res)
          })
        }
      }).finally(() => {
        this.spinner = false
      })
    }
  }
}
</script>
