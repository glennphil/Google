import axios from 'axios';

export default function Test() {

  const onSubmit = async() => {
    try {
      await axios({
        method: "post",
        url: "https://google-frontend.herokuapp.com/users",
        data: {
          firstName: "Johnny boy"
        },
        headers: { "Content-Type": "application/json"},
      });
    } catch(error) {
      console.log(error.response.data)
    }
    alert('Nice!')
  }
  return (
    <>
    <button onClick={onSubmit}>
      Click me
    </button>
    </>
  )
}