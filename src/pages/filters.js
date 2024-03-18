import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

const Filters = ({ show, handleClose, handleSearch, search }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} className="custom-modal" centered>
                <Modal.Header closeButton className="pb-2">
                    <Modal.Title>Filters</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-4">
                <Form>         
                    <Form.Group  className="mb-3">
                        <Form.Select aria-label="Default select example" name="radius" onChange={handleSearch} value={search.radius}>
                            <option>Choose Radius in Kms</option>
                            <option value="2">2 Kms</option>
                            <option value="4">4 Kms</option>
                            <option value="6">6 Kms</option>
                            <option value="8">8 Kms</option>
                        </Form.Select>
                    </Form.Group> 
                    <Form.Group  className="mb-3">
                        <Form.Select aria-label="Default select example" name="genderPreference" onChange={handleSearch} value={search.genderPreference}>
                            <option>Choose Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    </Form.Group> 
                    <Form.Group  className="mb-3">
                        <Form.Select aria-label="Default select example" name="propertyType" onChange={handleSearch} value={search.propertyType}>
                            <option>Choose house Type</option>
                            <option value="1 BHK">1 BHK</option>
                            <option value="2 BHK">2 BHK</option>
                            <option value="3 BHK">3 BHK</option>
                            <option value="4 BHK">3+ BHK</option>
                        </Form.Select>
                    </Form.Group> 
                    <div className="text-center pt-2">
                        <Button variant="theme" onClick={handleClose}>
                            Apply Filter
                        </Button>    
                    </div>
                                
                </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Filters;