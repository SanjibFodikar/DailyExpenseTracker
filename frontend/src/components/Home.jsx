import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const userId = localStorage.getItem('userId')
  return (
    <>
      <div className='text-center' style={{ marginTop: '100px' }}>
        <h1>Welcome to <span className='text-primary'>Daily Expense Tracker</span></h1>
        <p>Manage Your Task Efficiently and Effectively</p>

        <div className="options mt-3">
          {userId ? (
            <>
              <Link to="/dashboard" className="btn btn-warning"><span><i className="bi bi-speedometer2 me-2"></i>Go To Dashboard</span></Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-success mx-2"><span><i className="bi bi-person-plus-fill me-2"></i>Signup</span></Link>
              <Link to="/login" className="btn btn-primary"><span><i className="bi bi-arrow-right me-2"></i>Login</span></Link>
            </>
          )}

        </div>

      </div>
      <Features />
      <HowItWorks />
    </>
  )
}

export default Home

const Features = () => {
  return (
    <section className="container py-5">

      <div className="text-center mb-5">
        <h2>Everything You Need to Track Expenses</h2>
        <p className="text-muted">
          Simple tools to manage your daily spending.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card bg-primary text-center text-white h-100" style={{ minHeight: '150px' }}>
            <div className="card-body">
              <i className="bi bi-plus-circle-fill fs-1"></i>
              <h4 className="mt-3">Add Expenses</h4>
              <p className="text-white mb-0">
                Easily add and manage your daily expenses.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card bg-success text-center text-white h-100" style={{ minHeight: '150px' }}>
            <div className="card-body">
              <i className="bi bi-bar-chart-fill fs-1"></i>
              <h4 className="mt-3">Expense Reports</h4>
              <p className="text-white mb-0">
                Understand your spending with useful reports and charts.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card bg-secondary text-center text-white h-100" style={{ minHeight: '150px' }}>
            <div className="card-body">
              <i className="bi bi-search fs-1"></i>
              <h4 className="mt-3">Search Expenses</h4>
              <p className="text-white mb-0">
                Find your expenses easily using date-based search.
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}

export { Features }



const HowItWorks = () => {
  return (
    <section className="bg-light py-5">

      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">

          <span className="badge bg-primary rounded-pill px-3 py-2">
            SIMPLE PROCESS
          </span>

          <h2 className="fw-bold mt-3">
            How It Works
          </h2>

          <p className="text-muted">
            Manage your daily expenses in just three simple steps.
          </p>

        </div>


        <div className="row g-4">

          {/* Step 1 */}
          <div className="col-12 col-md-4">
            <div className="card border-primary border-2 shadow-sm text-center h-100 p-4 rounded-4">

              <div className="d-flex justify-content-center">

                <div
                  className="bg-primary text-white rounded-circle
                             d-flex align-items-center justify-content-center
                             fw-bold fs-4 shadow"
                  style={{ width: '55px', height: '55px' }}
                >
                  1
                </div>

              </div>

              <div className="bg-primary bg-opacity-10 rounded-3 py-3 mt-4">

                <i className="bi bi-plus-circle-fill text-primary display-4"></i>

              </div>

              <h4 className="fw-bold mt-4">
                Add Your Expense
              </h4>

              <p className="text-muted mb-0">
                Add your daily expenses with item, date and cost.
              </p>

            </div>
          </div>


          {/* Step 2 */}
          <div className="col-12 col-md-4">
            <div className="card border-success border-2 shadow-sm text-center h-100 p-4 rounded-4">

              <div className="d-flex justify-content-center">

                <div
                  className="bg-success text-white rounded-circle
                             d-flex align-items-center justify-content-center
                             fw-bold fs-4 shadow"
                  style={{ width: '55px', height: '55px' }}
                >
                  2
                </div>

              </div>

              <div className="bg-success bg-opacity-10 rounded-3 py-3 mt-4">

                <i className="bi bi-wallet2 text-success display-4"></i>

              </div>

              <h4 className="fw-bold mt-4">
                Track Your Spending
              </h4>

              <p className="text-muted mb-0">
                View, edit and manage all your expenses in one place.
              </p>

            </div>
          </div>


          {/* Step 3 */}
          <div className="col-12 col-md-4">
            <div className="card border-warning border-2 shadow-sm text-center h-100 p-4 rounded-4">

              <div className="d-flex justify-content-center">

                <div
                  className="bg-warning text-dark rounded-circle
                             d-flex align-items-center justify-content-center
                             fw-bold fs-4 shadow"
                  style={{ width: '55px', height: '55px' }}
                >
                  3
                </div>

              </div>

              <div className="bg-warning bg-opacity-10 rounded-3 py-3 mt-4">

                <i className="bi bi-bar-chart-fill text-warning display-4"></i>

              </div>

              <h4 className="fw-bold mt-4">
                Analyze Your Expenses
              </h4>

              <p className="text-muted mb-0">
                Use reports and charts to understand your spending.
              </p>

            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

export { HowItWorks }

