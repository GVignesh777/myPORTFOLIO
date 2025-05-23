let submit_form = document.querySelector('form');
var input_field = document.getElementsByTagName('input');
let contactSection = document.getElementById('contact-section');
const message_Sent_Status = document.querySelector('.message-sent-status');
const cross_mark = document.querySelector('#contact-section .message-sent-status i');
const message_title = document.getElementById('h5');
const message_description = document.getElementById('message-status-content');
let message_button = document.getElementById('message-button');



cross_mark.style.opacity = 0;
message_Sent_Status.addEventListener('mouseover', function() {
  cross_mark.style.opacity = 1;
});
message_Sent_Status.addEventListener('mouseout', function() {
  cross_mark.style.opacity = 0;
});

///////////// EmailJS configuration   ////////////////
// User's sending id's
const user_serviceId = 'service_aqwj46k';
const user_templateId = 'template_twc28yt';
const user_publicKey = 'Wc6K1JoCxajhtQ67r';

// Sending mail to owner

const owner_serviceId = 'service_aqwj46k';
const owner_templateId = 'template_ed8t02o_owner';
const owner_publicKey = 'Wc6K1JoCxajhtQ67r';

(function(){
  emailjs.init({
    publicKey: user_publicKey,
  });
})();

const templateParams = {
    from_name: input_field.name,
    from_email: input_field.email,
    message: input_field.message,
    to_name: `Hi ${input_field.name}`, // Changed from 'Portfolio Owner' to personalized greeting
    reply_to: input_field.email,
    to_email: input_field.email // Adding recipient email explicitly
  };
  
  console.log('Sending email with params:', templateParams);



  //Sending the response to user whether the message sent or not
submit_form.addEventListener("submit", function (e) {
  e.preventDefault();

  for(var i = 0; i < input_field.length; i++) {
    console.log(input_field[i].value);
  }

  // Sending the message to owner
  emailjs.sendForm(owner_serviceId, owner_templateId, this)
    .then(function () {
      console.log('Message sent to owner!');
    }, function(error) {
      console.log('FAILED in sending for owner...', error);
    });


  emailjs.sendForm(user_serviceId, user_templateId, this)
    .then(function () {
      
      // closeMenuTimer1 = setTimeout(() => {
      message_button.textContent = 'Sending...';
      // }, 500); // 0.5 seconds delay
      closeMenuTimer1 = setTimeout(() => {
      message_button.textContent = 'Sent';
      message_Sent_Status.classList.add('active');
      }, 2000); // 2 seconds delay

      message_title.textContent = "Message Sent!";
      message_description.innerHTML = `Thank you ${input_field[1].value}, your message has been sent successfully!`;



        closeMenuTimer2 = setTimeout(() => {
          message_button.textContent = 'Send Me a Message';
        }, 3500); // 3.5 seconds delay
      
    }, 
    function (error) {
        console.log('FAILED...', error);
      message_Sent_Status.classList.add('active');
      message_title.textContent = "Failed to send message!";
      message_description.innerHTML = `Sorry ${input_field[0].value}, there was an error sending your message. Please try again later.`;
      setInterval(() => {
        message_button.textContent = 'Not sent!';
      }, 1000);
    });
});





emailjs.sendForm(user_serviceId, user_templateId, this)
  .then(function() {
    console.log('SUCCESS!');
  }, function(error) {
    console.log('FAILED...', error);
  });

cross_mark.addEventListener('click', () => {
  message_Sent_Status.classList.remove('active');
});