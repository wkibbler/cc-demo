import React, {useState} from "react";
import classNames from "classnames";
import styles from './Home.module.scss';
import {css} from '../../helpers/css';
import Typography, {TType} from '../../DSL/Typography/Typography';
import observeMobx from '../../observeMobx';
import {useAppStore} from '../../store/App.store';
import Colors from '../../DSL/Colors';
import Row from '../../DSL/Row/Row'
import Col from '../../DSL/Col/Col'
import PaneWithTitle from '../../DSL/Pane/PaneWithTitle'
import Button from '../../DSL/Button/Button'
import Modal from '../../DSL/Modal/Modal'
import Input from '../../DSL/Input/Input'

export interface HomeProps {

}

const Home = observeMobx((props: HomeProps) => {
    const app = useAppStore();
    const [loading, setLoading] = useState(false)
    const [rigListModal, setRigListModal] = useState(false)
    const [rigList, setRigList] = useState([])
    const [daysModal, setDaysModal] = useState(false)
    const [days, setDays] = useState([])
    const [rigId, setRigId] = useState('')

    const getRigList = () => {
        setLoading(true)
        fetch('http://localhost:4732/connect/rig-list').then(res => res.json()).then(result => {
            if (result.status) {
                setLoading(false)
                setRigList(result.result)
                setRigListModal(true)
            } else {
                throw new Error()
            }
        }).catch(() => {
            setLoading(false)
            alert('error getting rig list')
        })
    }
    
    const getDasInMonth = () => {
        setLoading(true)
        fetch('http://localhost:4732/connect/days-per-month/' + rigId).then(res => res.json()).then(result => {
            if (result.status) {
                setLoading(false)
                setDays(result.result)
                setDaysModal(true)
            } else {
                throw new Error()
            }
        }).catch(() => {
            setLoading(false)
            alert('error getting rig list')
        })
    }
    return (
        <>
            <Row>
                <Col className='mt-4'>
                    <PaneWithTitle title='Config'>
                        <Typography size={15} type={TType.BodyBold}>Data Vendor</Typography>
                        <select>
                            <option>IDS</option>
                            <option disabled>Pronova (Coming Soon)</option>
                        </select>
                    </PaneWithTitle>
                </Col>
                <Col className='mt-4'>
                    <PaneWithTitle title='Get Rig List'>
                        <Button onClick={getRigList} loading={loading} size='lg'>Get Rig List</Button>
                    </PaneWithTitle>
                </Col>
            </Row>
            <Row>
                <Col className='mt-4'>
                    <PaneWithTitle title='Get Days'>
                        <Input value={rigId} onChange={setRigId} placeholder="Rig ID" size="lg" />
                        <Button loading={loading} onClick={getDasInMonth} size='lg' className="mt-3">Get Days</Button>
                    </PaneWithTitle>
                </Col>
            </Row>
            <Modal title="IDS Rig List" visible={rigListModal} setVisible={setRigListModal}>
                <Row className='mb-3'>
                    <Col md="6">
                        <Typography size={25} type={TType.BodyBold}>ID</Typography>
                    </Col>
                    <Col md="6">
                    <Typography size={25} type={TType.BodyBold}>Name</Typography>
                    </Col>
                </Row>
                {rigList.map((item: any) => (
                    <Row key={item.id}>
                        <Col md="6">
                            {item.id}
                        </Col>
                        <Col md="6">
                            {item.name}
                        </Col>
                    </Row>
                ))}
            </Modal>
            <Modal title="Days In Month" visible={daysModal} setVisible={setDaysModal}>
            <Row className='mb-3'>
                    <Col md="6">
                        <Typography size={25} type={TType.BodyBold}>Month</Typography>
                    </Col>
                    <Col md="6">
                    <Typography size={25} type={TType.BodyBold}>Total Days</Typography>
                    </Col>
                </Row>
                {days.map((item: any) => (
                    <Row key={item.id}>
                        <Col md="6">
                            {item.month}
                        </Col>
                        <Col md="6">
                            {item.total_days}
                        </Col>
                    </Row>
                ))}
            </Modal>
        </>
    )
})
export default Home;