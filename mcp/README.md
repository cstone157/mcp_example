### Setup virtual enviroment
$ python3 -m venv venv

### Enable virtual enviroment - windows
$ venv\Scripts\activate.bat
### Enable virtual enviroment - bash
$ source venv/Scripts/activate

### Install package
$ pip install package-name

### Save modules to requirements
$ pip freeze > requirements.txt

### Deactivate enviroment
$ deactivate

## ===============================================

### Build the image
nerdctl build --namespace k8s.io -t tmdash-mcp:v0.1 -f Dockerfile .
