from django.shortcuts import render

# Create your views here.

def index(request):
	return render(request, 'IMHere/index.html')

def home(request):
	context = {}
	if not 'username' in request.POST or not request.POST['username']:
		context['msg'] = 'please provide a name first!'
		return render(request, 'IMHere/index.html')

	# Got username
	context['username'] = request.POST['username']
	return render(request, 'IMHere/home.html', context)


