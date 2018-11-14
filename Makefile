export CURRENT_HEAD = $$(git rev-parse HEAD)

docker-build-client:
	@docker build -t cs_dashboard -f ./Dockerfile .
	@docker tag cs_dashboard:latest 077003688714.dkr.ecr.us-east-1.amazonaws.com/cs_dashboard:latest
	@docker tag cs_dashboard:latest 077003688714.dkr.ecr.us-east-1.amazonaws.com/cs_dashboard:${CURRENT_HEAD}
	@docker push 077003688714.dkr.ecr.us-east-1.amazonaws.com/cs_dashboard:latest
	@docker push 077003688714.dkr.ecr.us-east-1.amazonaws.com/cs_dashboard:${CURRENT_HEAD}
	@kubectl set image deployments/cs-dashboard-deployment cs-dashboard=077003688714.dkr.ecr.us-east-1.amazonaws.com/cs_dashboard:${CURRENT_HEAD}

