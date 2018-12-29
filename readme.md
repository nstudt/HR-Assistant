# HR - Assist

12/28/2018 - project initialized.

Status: not stable -


# Introduction

HR-Assist is a multi-tier product/service designed to assist Philippine-based businesses, manage their HR with efficiency and accuracy. It provides a single site to manage all employee data and includes multiple components.


## Employer Portal

A feature rich web application that allows employers to register employees, track their benefits and generate useful reports and forms required for HR compliance. The Employer portal is API based to allow others to build on the basic system.

Hire Employee:

Separate Employee:

Manage Employee:

Query Employees:

Maintain Company Data:


## Digital Assistant

The DA is a python-based machine with learning capabilities. The DA's job is to monitor the Digital Legal (DL) machine and implement dynamic rules on the Employer Portal based on interpretation of the DL data.

The DA maintains a connection to the underlying Employer Portal database server.

There is no current GUI planned for the DA, but it does provide verbose logging and alerts.


## Digital Legal

Digital Legal (DL) is a static machine that sets all rules on which the DA will monitor and act on.
