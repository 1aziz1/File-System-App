const fs =require('fs');
const readline =require('readline');

//create an interface for user input from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout});


const filePath ='data.txt';

//Function to read the file 

function readFile() {

     fs.readFile(filePath,'utf8',(err, data)=>{

        if (err) {
            if (err.code === 'ENOENT'){
                console.log('File not found , Creating a new file...');
                fs.writeFile(filePath, '',(err) =>{
                    if (err) throw err;
                    console.log('new file created');

                });

            }else{
                throw err;
            }

        }else {
            console.log( '\nFile Contents:\n ',data || 'The file is empty');

        }
     });
    }

    // function to append new content to the file 
    function appendToFile(){

        rl.question('\nEnter text to append to the file :',(input) =>{
            fs.appendFile(filePath,input + '\n' ,(err) =>{
                if (err) throw err;
                console.log('Text appended to the file');
                rl.close();
                });
            });
        

    }

    // function to delete the file 
    function deleteFile() {

        rl.question('\n Do you want to delete the file (yes / no): ', (answer)=>{
            if (answer.toLowerCase()=== 'yes'){
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log("file deleted ! ");
                    rl.close();
                });

            } else {
                console.log('file not deleted !');
                rl.close();
            }
        });
    }

    //Run  the functions

    readFile();

    setTimeout(()=>{

        rl.question('Do you want to append new content or delete the file (append/delete', (choice) => {
            if (choice.toLowerCase() === 'append') {
                appendToFile();
            } else if( choice.toLowerCase() ==='delete'){
                deleteFile();
            }
            else {
                console.log('Invalid choice ! ');
                rl.close();

            }
        });
    },1000); //Delay to allow the file read to complete
