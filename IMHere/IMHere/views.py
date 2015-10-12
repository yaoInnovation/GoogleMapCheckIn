from django.shortcuts import render

# Create your views here.

def index(request):
	return render(request, 'IMHere/index.html')

def home(request):
	context = {}
	if request.method == 'GET' and (not 'username' in request.session):
		return render(request, 'IMHere/index.html')

	if request.method == 'POST':
		if not 'username' in request.POST or not request.POST['username']:
			context['msg'] = 'please provide a name first!'
			return render(request, 'IMHere/index.html')
		# Got username
		username = request.POST['username']
		context['username'] = username
		request.session['username'] = username

	return render(request, 'IMHere/home.html', context)

def send_email(request):
	context = {}
	context['email_from'] = 'Yao'

	return render(request, 'IMHere/send_email.html', context)

