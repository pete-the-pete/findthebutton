/* eslint-env node */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here

    /*ENV['scp'] = {
      path: '/home/coffeenap/webapps/findthebutton',
      host: 'coffeenap.com',
      username: process.env.deployUsername
    }*/

    ENV['revision-data'] = {
      type: 'git-commit'
    },
    ENV['ssh-index'] = {
      host: "coffeenap.com",
      username: process.env.deployUsername,
      remoteDir: "/home/coffeenap/webapps/findthebutton",
      privateKeyFile: process.env.deployPrivateKey,
      allowOverwrite: true
    },
    ENV.rsync = {
      type: 'rsync',
      dest: "/home/coffeenap/webapps/findthebutton",
      host: `${process.env.deployUsername}@coffeenap.com`,
      privateKey: process.env.deployPrivateKey,
      delete: false
    }
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
