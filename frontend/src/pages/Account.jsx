import HeaderAuth from "../components/HeaderAuth"
import RenderAccount from "../components/RenderAccount"

const Account = () => {

  return (
    <main className = "flex column justifyContent" id = "dashboard">
      <HeaderAuth className = {"pages"}/>
      <h1 className = "justifyContent flex">Welcome to Your Account</h1>
      <div className = "table-wrapper flex justifyContent">
        <table>

          <thead>
            <tr>
              <th>Image</th>
              <th>Post Title</th>
              <th>Like / Comment</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            <RenderAccount/>
          </tbody>
        </table>
      </div>

<div className = "noDisplay verticalTable">
<table id = "table">
      <tbody>
      <RenderAccount/>

      </tbody>
    </table>
</div>


    </main>
  )
}

export default Account