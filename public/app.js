const createTopicForm = document.getElementById('create-topic');

createTopicForm.addEventListener('submit', e => {
  e.preventDefault();

  const topicTitle = e.target.topicTitle.value;
  const topicContent = e.target.topicContent.value;

  fetch({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topicTitle,
      topicContent
    })
  })
  .then(result => result.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.log);
});