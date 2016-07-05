// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },

  actions: {
    signIn: function(provider) {
      let store = this.get('store');
      this.get("session").open("firebase", { provider: provider}).then((data) => {
        let loginTime = Date.now();
        // check if the user exists in firebase
        store.query('user', {uid: data.uid}).then((foundUsers) => {
          let user = foundUsers.get('firstObject');
          if(user) {
            //  update the last login
            user.set('lastLogin', loginTime).save();
          } else {
            //  create the user
            user = store.createRecord('user', {
              'uid': data.uid,
              'name': data.currentUser.displayName,
              'createDate': loginTime,
              'lastLogin': loginTime,
              'provider': provider
            });
            user.save().then(() => {
                //something
            });
          }
          return user;
        }).then((user) => {
          // if they have completed onboarding
          //redirect to dashboard
          let redirect = 'dashboard';
          if(!user.get('completedOnboarding')) {
            // redirect to the dashboard or next step in onboarding
            redirect = user.get('nextOnboarding');
          }
          this.replaceWith(redirect);
        });
      });
    },

    signOut: function() {
      this.get("session").close();
    }
  }
});