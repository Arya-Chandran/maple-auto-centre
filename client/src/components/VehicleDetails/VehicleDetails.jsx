import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Features from '../Features'
import Details from '../Details'
import { Tooltip } from 'reactstrap'
import DealershipDetails from '../DealershipDetails'
import './VehicleDetails.scss'
import PaymentCalculation from '../Modals/PaymentCalculation'
import PricingSummary from '../PricingSummary'
import { BsFillCalculatorFill } from 'react-icons/bs'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { listInventoryDetails } from '../../actions/inventoryActions'

const host = 'http://localhost:8080'
const APR = [
  { term: 36, rate: 4.99 },
  { term: 48, rate: 4.99 },
  { term: 60, rate: 3.99 },
  { term: 72, rate: 3.99 },
  { term: 84, rate: 2.99 },
  { term: 96, rate: 2.99 },
]

const initialValues = {
  downPayment: 0,
  term: APR[0].term,
  frequency: 'Monthly',
}

const paymentFrequency = ['Weekly', 'Bi-weekly', 'Monthly']

const fees = 2000

const HST = 12

const getInterest = (amount, term, rate) => {
  return (
    (amount * (rate / 12) * Math.pow(1 + rate / 12, term)) /
    (Math.pow(1 + rate / 12, term) - 1)
  )
}

function VehicleDetails(props) {
  // const [vehicle, setVehicle] = useState({})
  const [modal, setModal] = useState(false)
  const [showPayment, setShow] = useState(false)
  const [payment, setPayment] = useState(null)
  const [isTooltip, setTooltip] = useState(false)

  const dispatch = useDispatch()
  const inventoryDetails = useSelector((state) => state.inventoryDetails)
  const { vehicle } = inventoryDetails

  const toggleModal = () => setModal(!modal)

  const openModal = () => {
    toggleModal()
  }

  // useEffect(() => {
  //   const { vin } = props.match.params
  //   getCurrentVehicle(vin)
  // }, [])

  useEffect(() => {
    const { vin } = props.match.params
    dispatch(listInventoryDetails(vin))
  }, [])

  useEffect(() => {
    if (vehicle) {
      const { price } = vehicle
      handleCalculation(initialValues, price)
    }
  }, [vehicle])

  // const getCurrentVehicle = (vin) => {
  //   axios
  //     .get(`${host}/inventory/${vin}`)
  //     .then((response) => {
  //       setVehicle(response.data)
  //     })
  //     .catch((error) => console.log(error))
  // }

  const getPaymentCount = (term, frequency) => {
    switch (frequency) {
      case 'Monthly':
        return term
      case 'Bi-weekly':
        return term * 2
      case 'Weekly':
        return term * 4
    }
  }

  const goback = (e) => {
    e.preventDefault()
    props.history.goBack()
  }

  const handleCalculation = (values, price) => {
    const { downPayment, term, frequency } = values

    const amount = price - downPayment + fees
    const selectedAPR = APR.find((option) => option.term == term)
    const rate = selectedAPR.rate
    const principal = parseFloat(amount)
    const interest = parseFloat(rate) / 100 / 12
    const numPayments = getPaymentCount(Number(term), frequency)

    // compute the monthly payment figure
    const x = Math.pow(1 + interest, numPayments) //Math.pow computes powers
    const paymentAmount = (principal * x * interest) / (x - 1)
    const payment = paymentAmount.toFixed(2)

    setShow(true)
    setPayment({
      price,
      amount,
      fees,
      rate,
      term,
      payment,
      downPayment,
      frequency,
    })
  }

  return (
    <div className='details'>
      {Object.keys(vehicle).length !== 0 && (
        <div className='details__wrapper'>
          <div className='details__arrowWrapper'>
            <IoMdArrowRoundBack
              className='details__arrow'
              onClick={(e) => goback(e)}
            />
            <p className='details__arrowContent'>Back to previous page</p>
          </div>
          <div className='details__main'>
            <p className='details__year'>{vehicle.year}</p>
            <div className='details__row'>
              <p className='details__make'>{vehicle.make}</p>
              <p className='details__model'>{vehicle.model}</p>
            </div>
            <p className='details__trim'>{vehicle.trim}</p>
          </div>
          <p className='details__vin'>
            <span className='details__vin--highlight'>VIN: </span> {vehicle.vin}
          </p>
          <div className='details__topSection'>
            <div className='details__imageWrapper'>
              <img
                className='details__image'
                src={`${host}/${vehicle.images[0]}`}
                alt='Images'
              />
            </div>
            <div className='details__pricingWrapper'>
              <p className='details__title'>Selling price</p>
              <p className='details__price'>${vehicle.price}</p>
              <BsFillCalculatorFill
                id='paymentCalculation'
                onClick={() => openModal(vehicle)}
              />
              <Tooltip
                placement='right'
                isOpen={isTooltip}
                target='paymentCalculation'
                toggle={() => {
                  setTooltip(!isTooltip)
                }}
              >
                Payment Calculation
              </Tooltip>

              {showPayment && <PricingSummary payment={payment} />}
            </div>
          </div>

          <div className='details__section'>
            <Features features={vehicle.features} />
            <Details details={vehicle.details} />
          </div>
          <DealershipDetails vehicle={vehicle} />
        </div>
      )}
      <PaymentCalculation
        onClose={toggleModal}
        vehicle={vehicle}
        isOpen={modal}
        initialValues={initialValues}
        handleCalculation={handleCalculation}
      />
    </div>
  )
}

export default VehicleDetails
