parasails.registerPage('available-things', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    things: [],

    openModalCreateNewThing: false,

    conformingDeleteThingModalOpen: false,
    selectedThing: undefined,

    createThingFormData: {},
    createThingFormErrors: {},
    // createThingFormRules: {
    //  thingName: { required: true },
    // }

    // Main syncing/loading state for this page.
    syncing: false,

    // Form data
    formData: { /* … */ },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Server error state for the form
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    console.log("vars", SAILS_LOCALS);
    console.log("this", this);
    console.log("parasails", parasails);
    console.log("pop", this.populatedata);
    
  },
  mounted: async function() {

  },

  created() {
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    openCreateNewThing: async function() {
      this.openModalCreateNewThing = true;
    },

    handleParsingDeleteThingForm: function() {
      return {id: this.selectedThing.id};
    },

    clickDeleteThing: async function (thingId) {
      console.log('clicked the delete button');
      this.conformingDeleteThingModalOpen = true;
      this.selectedThing = _.find(this.things, { id : thingId});
    },

    deleteThingFinal: async function (thingId) {
      this.things = await Cloud.destroyOneThing.with({id: thingId});
      _.remove(this.things, {id: thingId});
      this.$forceUpdate();
      console.log(this.things);
      this.conformingDeleteThingModalOpen = false;
      this.selectedThing = undefined;
      console.log('final delete');
    },
    
    submittedDeleteThingForm: async function() {
      _.remove(this.things, {id: this.selectedThing.id});
      this.$forceUpdate();
      this.conformingDeleteThingModalOpen = false;
    }
  }
});
