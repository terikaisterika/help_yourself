console.log('HELLO');
function get_user_choice(list, property) {
  for (let i = 0; i < list.length; i++) {
    if (list[i][property]) {
      console.log('List', list[i][property]);
      return list[i];
    }
  }
  throw new Error(`В списке элементов нет свойства ${property}`);
}
const form_hurting = document.forms['hurting_me'];
function return_block_herting() {
  const but_submit_hurting = document.getElementById('submit_hurting');
  but_submit_hurting.addEventListener('click', (e) => {
    e.preventDefault();

    const list_hurting = document.querySelectorAll(
      "[name='hurting_me_sel'] option"
    );
    console.log('Терика chosen_abuser: ', list_hurting);
    let chosen_abuser = get_user_choice(list_hurting, 'selected');

    let user_selection = JSON.stringify({
      value: chosen_abuser.value,
      textContent: chosen_abuser.textContent,
    });
    let request = new XMLHttpRequest();
    request.open('POST', '/it_hurts_me', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
      form_hurting.classList.add('hidden');
      const answer = JSON.parse(request.response);
      const main_div = document.querySelector('#hurting');
      let div = document.createElement('div');
      let p = document.createElement('p');
      let p2 = document.createElement('p');
      p.append(`Вас обижает: ${answer.aggressor}`);
      p2.append(answer.answer);
      div.append(p);
      div.append(p2);
      main_div.append(div);
    });
    request.send(user_selection);
  });
}
return_block_herting();
