import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import ShortJobOffer from "../../Components/student/ShortJobOffer";

describe("ShortJobOffer", () => {
    const mockJobOffer = {
        title: "Software Engineer",
        department: "Engineering",
        nbOfCandidates: 5,
        jobOfferState: "ACTIVE",
        id: "123"
    };
    beforeEach(() => {
        render(<ShortJobOffer jobOffer={mockJobOffer} />);
    });

    it('should render the job title', () => {
        expect(screen.getByTestId('job-title')).toHaveTextContent(mockJobOffer.title);
    });

    it('should render the department', () => {
        expect(screen.getByTestId('job-department')).toHaveTextContent(mockJobOffer.department);
    });
});