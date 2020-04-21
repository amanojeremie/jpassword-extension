(function() {
    if(window.hasJPass) {
        return;
    }
    window.hasJPass = true;

    browser.runtime.onMessage.addListener((credential) => {
        let passField = document.querySelector('input[type="password"]');
        if (passField !== null) {
            passField.value = credential.password;
            let userField = document.querySelector('input[type="email"], input[name="username"]');
            if (userField !== null) {
                userField.value = credential.username;
            }
        }
    });
})();